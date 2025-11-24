import { Module } from '@nestjs/common';
import { FlashcardDeck } from './flashcard-deck.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([FlashcardDeck])],
})
export class FlashcardDeckModule {}
