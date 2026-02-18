import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlashcardDeck } from './flashcard-deck.entity';
import { CreateDeckDTO } from './dto/create-deck.dto';
import { UpdateDeckDTO } from './dto/update-deck.dto';
import { Card } from '@src/card/card.entity';
import { LessThanOrEqual } from 'typeorm';
import { ImagesService } from '@src/images/images.service';
import { GoogleGenAI } from '@google/genai';
import sharp from 'sharp';
import dotenv from 'dotenv';
import { S3Client } from '@aws-sdk/client-s3';
import crypto from 'crypto';

const ai = new GoogleGenAI({});

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
export class FlashcardDeckService {
  constructor(
    @InjectRepository(FlashcardDeck)
    private deckRepository: Repository<FlashcardDeck>,
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    private readonly imageService: ImagesService,
  ) {}

  async findAll() {
    try {
      return await this.deckRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async countDecks() {
    try {
      return await this.deckRepository.count();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.deckRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getCards(id: number) {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async countCards(id: number) {
    try {
      return await this.cardRepository.count({ where: { deck: { id } } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getDueCards(id: number) {
    try {
      const cards = await this.cardRepository.find({
        where: {
          deck: { id },
          schedule: { due: LessThanOrEqual(new Date()) },
        },
        relations: ['schedule', 'questionImage', 'answerImage'],
      });
      return Promise.all(cards.map((card) => this.imageService.signCard(card)));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async countDueCards(id: number) {
    try {
      return await this.cardRepository.count({
        where: {
          deck: { id },
          schedule: { due: LessThanOrEqual(new Date()) },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(dto: CreateDeckDTO) {
    try {
      const deck = this.deckRepository.create({
        name: dto.name,
        description: dto.description,
      });
      await this.deckRepository.save(deck);
      return deck;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, dto: UpdateDeckDTO) {
    try {
      const result = await this.deckRepository.update(id, {
        name: dto.name,
        description: dto.description,
      });

      if (result.affected === 0) {
        throw new NotFoundException(`Failure: Item with Id ${id} not found`);
      }

      return await this.deckRepository.findOne({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: number) {
    try {
      const result = await this.deckRepository.delete(id);

      if (result.affected === 0) {
        throw new NotFoundException(`Failure: Item with Id ${id} not found`);
      }

      return { message: `Delete Successful: Item with Id ${id} was deleted` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  async getLastId() {
    try {
      return await this.deckRepository.maximum('id');
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Adds a list of new cards to the end of a deck
   * @param deckId
   * @param newCards
   */
  async appendCards(deckId: number, newCards: Card[]) {
    try {
      const deck = await this.findOne(deckId);

      if (!deck) {
        throw new NotFoundException(`Deck with id ${deckId} was not found`);
      }

      const cardsToAdd = newCards.map((card) => {
        return this.cardRepository.create({ ...card, deck });
      });

      return await this.cardRepository.save(cardsToAdd);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  async generateAICardsFromText(text: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: text,
    });
    return response.text;
  }

  async generateAICardsFromFile(file: Express.Multer.File) {
    const base64Data = file.buffer.toString('base64');
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: file.mimetype,
              },
            },
            {
              text: 'Generate flashcards from the attached file. Return strictly a JSON array of objects with "question" and "answer" keys.',
            },
          ],
        },
      ],
    });

    return response.text;
  }

  async generateAICardsFromLink(url: string) {
    // TODO: Implement URL scraping logic to get text content
    throw new InternalServerErrorException(
      'Link input for AI cards is not yet implemented',
    );
  }
}
