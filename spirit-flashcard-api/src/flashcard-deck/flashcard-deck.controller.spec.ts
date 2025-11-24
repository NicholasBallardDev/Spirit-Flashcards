import { Test, TestingModule } from '@nestjs/testing';
import { FlashcardDeckController } from './flashcard-deck.controller';

describe('FlashcardDeckController', () => {
  let controller: FlashcardDeckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlashcardDeckController],
    }).compile();

    controller = module.get<FlashcardDeckController>(FlashcardDeckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
