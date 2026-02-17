import { Test, TestingModule } from '@nestjs/testing';
import { FlashcardDeckService } from './flashcard-deck.service';
import { describe, beforeEach, it, expect } from '@jest/globals';

describe('FlashcardDeckService', () => {
  let service: FlashcardDeckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlashcardDeckService],
    }).compile();

    service = module.get<FlashcardDeckService>(FlashcardDeckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
