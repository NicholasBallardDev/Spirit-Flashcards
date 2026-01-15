import { Module } from '@nestjs/common';
import { FlashcardDeck } from './flashcard-deck.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlashcardDeckService } from './flashcard-deck.service';
import { FlashcardDeckController } from './flashcard-deck.controller';
import { Card } from '@src/card/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FlashcardDeck, Card])],
  providers: [FlashcardDeckService],
  controllers: [FlashcardDeckController],
})
export class FlashcardDeckModule {}
