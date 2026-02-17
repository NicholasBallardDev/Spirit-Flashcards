import { Test, TestingModule } from '@nestjs/testing';
import { FlashcardDeckService } from './flashcard-deck.service';
import { describe, beforeEach, it, expect, jest } from '@jest/globals';
import { ImagesService } from '@src/images/images.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FlashcardDeck } from './flashcard-deck.entity';
import { Card } from '@src/card/card.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('FlashcardDeckService', () => {
  let service: FlashcardDeckService;
  let deckRepository: Repository<FlashcardDeck>;
  let cardRepository: Repository<Card>;

  const DECK_REPOSITORY_TOKEN = getRepositoryToken(FlashcardDeck);
  const CARD_REPOSITORY_TOKEN = getRepositoryToken(Card);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlashcardDeckService,
        {
          provide: DECK_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(),
            count: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            maximum: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: CARD_REPOSITORY_TOKEN,
          useValue: {
            count: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: ImagesService,
          useValue: {
            signCard: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FlashcardDeckService>(FlashcardDeckService);
    deckRepository = module.get<Repository<FlashcardDeck>>(
      DECK_REPOSITORY_TOKEN,
    );
    cardRepository = module.get<Repository<Card>>(CARD_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('appendCards', () => {
    it('should add new cards to a deck', async () => {
      const deckId = 1;
      const mockDeck = { id: deckId, name: 'Test Deck' } as FlashcardDeck;
      const newCards = [
        { question: 'Q1', answer: 'A1' },
        { question: 'Q2', answer: 'A2' },
      ] as Card[];
      const createdCards = newCards.map((c) => ({ ...c, deck: mockDeck }));

      jest.spyOn(deckRepository, 'findOne').mockResolvedValue(mockDeck);
      jest;
      jest
        .spyOn(cardRepository, 'create')
        .mockImplementation((card) => ({ ...card, deck: mockDeck }) as Card);
      jest.spyOn(cardRepository, 'save').mockResolvedValue(createdCards);

      const result = await service.appendCards(deckId, newCards);

      expect(deckRepository.findOne).toHaveBeenCalledWith({
        where: { id: deckId },
      });
      expect(cardRepository.create).toHaveBeenCalledTimes(newCards.length);
      expect(cardRepository.save).toHaveBeenCalledWith(createdCards);
      expect(result).toEqual(createdCards);
    });

    it('should throw NotFoundException if deck is not found', async () => {
      const deckId = 999;
      const newCards = [{ question: 'Q1', answer: 'A1' }] as Card[];

      jest.spyOn(deckRepository, 'findOne').mockResolvedValue(null);

      await expect(service.appendCards(deckId, newCards)).rejects.toThrow(
        new NotFoundException(`Deck with id ${deckId} was not found`),
      );
    });
  });
});
