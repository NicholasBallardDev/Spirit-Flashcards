import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';
import { Card } from '@src/card/card.entity';

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION as string;
const accessKey = process.env.ACCESS_KEY as string;
const secretAccessKey = process.env.SECRET_ACCESS_KEY as string;

const s3 = new S3Client({
  credentials: {
    secretAccessKey: secretAccessKey,
    accessKeyId: accessKey,
  },
  region: bucketRegion,
});

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async create(file: Express.Multer.File, key: string): Promise<Image> {
    try {
      const newImage = this.imageRepository.create({
        filename: file.originalname,
        key: key,
      });
      return await this.imageRepository.save(newImage);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return await this.imageRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<Image> {
    try {
      const image = await this.imageRepository.findOne({ where: { id } });

      if (!image) {
        throw new NotFoundException(`Image with ID #${id} not found.`);
      }

      image.url = await this.generateUrl(image);

      return image;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  async generateUrl(image: Image): Promise<string> {
    try {
      const getObjectParams = {
        Bucket: bucketName,
        Key: image?.key,
      };

      const command = new GetObjectCommand(getObjectParams);
      return await getSignedUrl(s3, command, { expiresIn: 3600 });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: number,
    newFile: Express.Multer.File,
    newKey: string,
  ): Promise<Image> {
    try {
      const imageToUpdate = await this.imageRepository.findOne({
        where: { id },
      });
      if (!imageToUpdate) {
        throw new NotFoundException(`Image with ID #${id} not found.`);
      }

      // Delete old file from storage
      const params = {
        Bucket: bucketName,
        Key: imageToUpdate.key,
      };
      const command = new DeleteObjectCommand(params);
      await s3.send(command);

      // Update and save
      imageToUpdate.filename = newFile.originalname;
      imageToUpdate.key = newKey;
      const updatedImage = await this.imageRepository.save(imageToUpdate);

      return updatedImage;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.deleteFromStorage(id);
      await this.imageRepository.delete(id);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  async deleteFromStorage(id: number): Promise<void> {
    try {
      const image = await this.findOne(id);
      if (!image) {
        throw new BadRequestException('Image not found', {
          cause: new Error(),
          description: `image with id ${id} does not exist`,
        });
      }

      const params = {
        Bucket: bucketName,
        Key: image.key,
      };

      const command = new DeleteObjectCommand(params);
      await s3.send(command);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  async signCard(card: Card): Promise<Card> {
    try {
      if (card.questionImage) {
        card.questionImage.url = await this.generateUrl(card.questionImage);
      }
      if (card.answerImage) {
        card.answerImage.url = await this.generateUrl(card.answerImage);
      }
      return card;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
