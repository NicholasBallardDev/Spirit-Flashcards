import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlashcardDeck } from './flashcard-deck.entity';
import { CreateDeckDTO } from './dto/create-deck.dto';
import { UpdateDeckDTO } from './dto/update-deck.dto';
import { Card } from '@src/card/card.entity';
import { LessThanOrEqual } from 'typeorm';
import { ImagesService } from '@src/images/images.service';

@Injectable()
export class FlashcardDeckService {
  constructor(
    @InjectRepository(FlashcardDeck)
    private deckRepository: Repository<FlashcardDeck>,
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    private readonly imageService: ImagesService,
  ) {}

  async findAll() {
    return this.deckRepository.find();
  }

  async countDecks() {
    return this.deckRepository.count();
  }

  async findOne(id: number) {
    return this.deckRepository.findOne({ where: { id } });
  }

  async getCards(id: number) {
    const deck = await this.deckRepository.findOne({
      where: { id },
      relations: [
        'cards',
        'cards.schedule',
        'cards.questionImage',
        'cards.answerImage',
      ],
    });

    if (deck?.cards) {
      deck.cards = await Promise.all(
        deck.cards.map((card) => this.imageService.signCard(card)),
      );
    }
    return deck;
  }

  async countCards(id: number) {
    return this.cardRepository.count({ where: { deck: { id } } });
  }

  async getDueCards(id: number) {
    const cards = await this.cardRepository.find({
      where: {
        deck: { id },
        schedule: { due: LessThanOrEqual(new Date()) },
      },
      relations: ['schedule', 'questionImage', 'answerImage'],
    });
    return Promise.all(cards.map((card) => this.imageService.signCard(card)));
  }

  async countDueCards(id: number) {
    return this.cardRepository.count({
      where: {
        deck: { id },
        schedule: { due: LessThanOrEqual(new Date()) },
      },
    });
  }

  async create(dto: CreateDeckDTO) {
    const deck = this.deckRepository.create({
      name: dto.name,
      description: dto.description,
    });
    await this.deckRepository.save(deck);
    return deck;
  }

  async update(id: number, dto: UpdateDeckDTO) {
    const result = await this.deckRepository.update(id, {
      name: dto.name,
      description: dto.description,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Failure: Item with Id ${id} not found`);
    }

    return this.deckRepository.findOne({ where: { id } });
  }

  async delete(id: number) {
    const result = await this.deckRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Failure: Item with Id ${id} not found`);
    }

    return { message: `Delete Successful: Item with Id ${id} was deleted` };
  }

  async getLastId() {
    return this.deckRepository.maximum('id');
  }
}
