import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { UpdateImageDto } from './dto/update-image.dto';
import * as fs from 'fs/promises';
import * as path from 'path';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
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
    const newImage = this.imageRepository.create({
      filename: file.originalname,
      key: key,
    });
    return this.imageRepository.save(newImage);
  }

  findAll() {
    return this.imageRepository.find();
  }

  async findOne(id: number): Promise<Image> {
    const image = await this.imageRepository.findOne({ where: { id } });

    if (!image) {
      throw new NotFoundException(`Image with ID #${id} not found.`);
    }

    image.url = await this.generateUrl(image);

    return image;
  }

  async generateUrl(image: Image): Promise<string> {
    const getObjectParams = {
      Bucket: bucketName,
      Key: image?.key,
    };

    const command = new GetObjectCommand(getObjectParams);
    return getSignedUrl(s3, command, { expiresIn: 3600 });
  }

  async update(
    id: number,
    newFile: Express.Multer.File,
    newKey: string,
  ): Promise<Image> {
    const imageToUpdate = await this.findOne(id);
    const oldFilename = imageToUpdate.filename;

    // Update entity properties with new file info
    imageToUpdate.filename = newFile.filename;
    imageToUpdate.key = newKey;

    const updatedImage = await this.imageRepository.save(imageToUpdate);

    // After DB is updated, delete the old file from disk
    try {
      const filePath = path.join(process.cwd(), 'uploads', oldFilename);
      await fs.unlink(filePath);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error(`Failed to delete old image file: ${oldFilename}`, error);
      }
    }

    return updatedImage;
  }

  async delete(id: number): Promise<void> {
    const image = await this.findOne(id);

    try {
      const filePath = path.join(process.cwd(), 'uploads', image.filename);
      await fs.unlink(filePath);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error(`Failed to delete image file: ${image.filename}`, error);
      }
    }

    await this.imageRepository.delete(id);
  }

  async signCard(card: Card): Promise<Card> {
    if (card.questionImage) {
      card.questionImage.url = await this.generateUrl(card.questionImage);
    }
    if (card.answerImage) {
      card.answerImage.url = await this.generateUrl(card.answerImage);
    }
    return card;
  }
}
