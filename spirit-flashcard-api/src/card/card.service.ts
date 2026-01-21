import { Injectable, NotFoundException } from '@nestjs/common';
import { Express } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { LessThanOrEqual, Repository } from 'typeorm';
import { CreateCardDTO } from './dto/create-card.dto';
import { FlashcardDeck } from '@src/flashcard-deck/flashcard-deck.entity';
import { UpdateCardDTO } from './dto/update-card.dto';
import { ScheduleService } from '@src/schedule/schedule.service';
import { Image } from '@src/images/entities/image.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    private scheduleService: ScheduleService,
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

  async uploadImages(
    id: number,
    files: {
      questionImage?: Express.Multer.File[];
      answerImage?: Express.Multer.File[];
    },
  ) {
    const card = await this.findOne(id);
    if (!card) {
      throw new NotFoundException(`Card with ID "${id}" not found.`);
    }

    const createAndSaveImage = async (file: Express.Multer.File) => {
      const newImage = this.imageRepository.create({
        filename: file.filename,
        // This URL should be configured based on your static file serving setup
        url: `/uploads/${file.filename}`,
        mimetype: file.mimetype,
        size: file.size,
      });
      return this.imageRepository.save(newImage);
    };

    if (files?.questionImage?.[0]) {
      // Replace the image reference if theres already an image
      const newImage = await createAndSaveImage(files.questionImage[0]);
      card.questionImage = newImage;
    }

    if (files?.answerImage?.[0]) {
      // and the database. For now, we'll just replace the reference.
      const newImage = await createAndSaveImage(files.answerImage[0]);
      card.answerImage = newImage;
    }

    const updatedCard = await this.cardRepository.save(card);
    return updatedCard;
  }

  async delete(id: number) {
    const result = await this.cardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Item with the id of ${id} was not found`);
    }
    return {
      message: `Deletion Successful: Item with the id of ${id} was deleted`,
    };
  }
}
