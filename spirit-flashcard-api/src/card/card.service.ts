import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { Repository } from 'typeorm';
import { CreateCardDTO } from './dto/create-card.dto';
import { FlashcardDeck } from '@src/flashcard-deck/flashcard-deck.entity';
import { UpdateCardDTO } from './dto/update-card.dto';
import { ScheduleService } from '@src/schedule/schedule.service';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    private scheduleService: ScheduleService,
  ) {}

  async findAll() {
    return this.cardRepository.find({ relations: ['deck', 'schedule'] });
  }

  async findOne(id: number) {
    return this.cardRepository.findOne({
      where: { id },
      relations: ['deck', 'schedule'],
    });
  }

  async findDeck(deckId: number) {
    return this.cardRepository.find({
      where: { deck: { id: deckId } },
      relations: ['deck', 'schedule'],
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
      relations: ['deck', 'schedule'],
    });
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
