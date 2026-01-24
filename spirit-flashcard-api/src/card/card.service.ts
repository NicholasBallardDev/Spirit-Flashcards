import { Injectable, NotFoundException } from '@nestjs/common';
import { Express } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { LessThanOrEqual, Repository } from 'typeorm';
import { CreateCardDTO } from './dto/create-card.dto';
import { FlashcardDeck } from '@src/flashcard-deck/flashcard-deck.entity';
import { UpdateCardDTO } from './dto/update-card.dto';
import { ScheduleService } from '@src/schedule/schedule.service';
import { ImagesService } from '@src/images/images.service';
import { Bucket$, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
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
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    private readonly imageService: ImagesService,
    private readonly scheduleService: ScheduleService,
  ) {}

  async findAll() {
    return this.cardRepository.find({
      relations: ['deck', 'schedule', 'questionImage', 'answerImage'],
    });
  }

  async countCards() {
    return this.cardRepository.count();
  }

  async findOne(id: number) {
    return this.cardRepository.findOne({
      where: { id },
      relations: ['deck', 'schedule', 'questionImage', 'answerImage'],
    });
  }

  async findDeck(deckId: number) {
    return this.cardRepository.find({
      where: { deck: { id: deckId } },
      relations: ['deck', 'schedule', 'questionImage', 'answerImage'],
    });
  }

  async findAllDue() {
    return this.cardRepository.find({
      where: {
        schedule: {
          due: LessThanOrEqual(new Date()),
        },
      },
      relations: ['deck', 'schedule', 'questionImage', 'answerImage'],
    });
  }

  async countCardsDue() {
    return this.cardRepository.count({
      where: {
        schedule: {
          due: LessThanOrEqual(new Date()),
        },
      },
    });
  }

  async create(dto: CreateCardDTO) {
    const schedule = this.scheduleService.create();

    const card = this.cardRepository.create({
      question: dto.question,
      answer: dto.answer,
      deck: dto.deckId ? ({ id: dto.deckId } as FlashcardDeck) : undefined,
      schedule: schedule,
    });
    const saved = await this.cardRepository.save(card);
    return saved;
  }

  async update(id: number, dto: UpdateCardDTO) {
    await this.cardRepository.update(id, {
      question: dto.question,
      answer: dto.answer,
      deck: dto.deckId ? ({ id: dto.deckId } as FlashcardDeck) : undefined,
    });
    return this.cardRepository.findOne({
      where: { id },
      relations: ['deck', 'schedule', 'questionImage', 'answerImage'],
    });
  }

  private async setImage(
    id: number,
    imageType: 'questionImage' | 'answerImage',
    file: Express.Multer.File,
  ) {
    const card = await this.findOne(id);
    if (!card) {
      throw new NotFoundException(`Card with ID "${id}" not found.`);
    }

    if (card[imageType]) {
      // If an image already exists, update it
      await this.imageService.update(card[imageType].id, file);
    } else {
      // Otherwise, create a new one and link it
      card[imageType] = await this.imageService.create(file);
      await this.cardRepository.save(card);
    }
    const params = {
      Bucket: bucketName,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    return this.findOne(id);
  }

  async setQuestionImage(id: number, file: Express.Multer.File) {
    return this.setImage(id, 'questionImage', file);
  }

  async setAnswerImage(id: number, file: Express.Multer.File) {
    return this.setImage(id, 'answerImage', file);
  }

  async delete(id: number) {
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
  }
}
