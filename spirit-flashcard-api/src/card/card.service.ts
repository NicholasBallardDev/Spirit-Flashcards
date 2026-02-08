import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { LessThanOrEqual, Repository } from 'typeorm';
import { CreateCardDTO } from './dto/create-card.dto';
import { FlashcardDeck } from '@src/flashcard-deck/flashcard-deck.entity';
import { UpdateCardDTO } from './dto/update-card.dto';
import { ScheduleService } from '@src/schedule/schedule.service';
import { ImagesService } from '@src/images/images.service';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import dotenv from 'dotenv';
import crypto from 'crypto';
import 'multer';

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

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString('hex');

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    private readonly imageService: ImagesService,
    private readonly scheduleService: ScheduleService,
  ) {}

  async findAll() {
    try {
      const cards = await this.cardRepository.find({
        relations: ['deck', 'schedule', 'questionImage', 'answerImage'],
      });
      return Promise.all(cards.map((card) => this.imageService.signCard(card)));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async countCards() {
    try {
      return await this.cardRepository.count();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const card = await this.cardRepository.findOne({
        where: { id },
        relations: ['deck', 'schedule', 'questionImage', 'answerImage'],
      });

      return card ? this.imageService.signCard(card) : null;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findDeck(deckId: number) {
    try {
      const cards = await this.cardRepository.find({
        where: { deck: { id: deckId } },
        relations: ['deck', 'schedule', 'questionImage', 'answerImage'],
      });
      return Promise.all(cards.map((card) => this.imageService.signCard(card)));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAllDue() {
    try {
      const cards = await this.cardRepository.find({
        where: {
          schedule: {
            due: LessThanOrEqual(new Date()),
          },
        },
        relations: ['deck', 'schedule', 'questionImage', 'answerImage'],
      });
      return Promise.all(cards.map((card) => this.imageService.signCard(card)));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async countCardsDue() {
    try {
      return await this.cardRepository.count({
        where: {
          schedule: {
            due: LessThanOrEqual(new Date()),
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(dto: CreateCardDTO) {
    try {
      const schedule = this.scheduleService.create();

      const card = this.cardRepository.create({
        question: dto.question,
        answer: dto.answer,
        deck: dto.deckId ? ({ id: dto.deckId } as FlashcardDeck) : undefined,
        schedule: schedule,
      });
      const saved = await this.cardRepository.save(card);
      return saved;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, dto: UpdateCardDTO) {
    try {
      await this.cardRepository.update(id, {
        question: dto.question,
        answer: dto.answer,
        deck: dto.deckId ? ({ id: dto.deckId } as FlashcardDeck) : undefined,
      });
      return await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private async setImage(
    id: number,
    imageType: 'questionImage' | 'answerImage',
    file: Express.Multer.File,
  ) {
    try {
      const card = await this.findOne(id);

      if (!card) {
        throw new NotFoundException(`Card with ID "${id}" not found.`);
      }

      const buffer = await sharp(file.buffer)
        .resize({ height: 1080, width: 1920, fit: 'contain' })
        .webp({ quality: 75 })
        .toBuffer();

      const key = randomImageName();
      const webpMimeType = 'image/webp';
      const webpFile = {
        ...file,
        buffer: buffer,
        size: buffer.length,
        originalname: `${file.originalname.replace(/\.[^/.]+$/, '')}.webp`,
        mimetype: webpMimeType,
      };

      if (card[imageType]) {
        // If an image already exists, update it
        await this.imageService.update(card[imageType].id, webpFile, key);
      } else {
        // Otherwise, create a new one and link it
        card[imageType] = await this.imageService.create(webpFile, key);
        await this.cardRepository.save(card);
      }

      const params = {
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ContentType: webpMimeType,
      };

      const command = new PutObjectCommand(params);
      await s3.send(command);
      return await this.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  async setQuestionImage(id: number, file: Express.Multer.File) {
    try {
      return await this.setImage(id, 'questionImage', file);
    } catch (error) {
      throw error;
    }
  }

  async setAnswerImage(id: number, file: Express.Multer.File) {
    try {
      return await this.setImage(id, 'answerImage', file);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const card = await this.findOne(id);
      if (!card) {
        throw new NotFoundException(`Item with the id of ${id} was not found`);
      }

      const result = await this.cardRepository.delete(id);

      // Delete images when card is gone
      if (card.questionImage)
        await this.imageService.delete(card.questionImage.id);
      if (card.answerImage) await this.imageService.delete(card.answerImage.id);

      return {
        message: `Deletion Successful: Item with the id of ${id} was deleted`,
        res: result,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
}
