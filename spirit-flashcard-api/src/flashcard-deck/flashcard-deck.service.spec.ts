import { Test, TestingModule } from '@nestjs/testing';
import { FlashcardDeckService } from './flashcard-deck.service';
import { describe, beforeEach, it, expect } from '@jest/globals';
import { ImagesService } from '@src/images/images.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FlashcardDeck } from './flashcard-deck.entity';
import { Card } from '@src/card/card.entity';

describe('FlashcardDeckService', () => {
  let service: FlashcardDeckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlashcardDeckService,
        {
          provide: getRepositoryToken(FlashcardDeck),
          useValue: {}, // Mock methods for FlashcardDeck repository
        },
        {
          provide: getRepositoryToken(Card),
          useValue: {}, // Mock methods for Card repository
        },
        {
          provide: ImagesService,
          useValue: {}, // Mock methods for ImagesService
        },
      ],
    }).compile();

    service = module.get<FlashcardDeckService>(FlashcardDeckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
