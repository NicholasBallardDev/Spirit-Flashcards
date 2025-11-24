import { Module } from '@nestjs/common';
import { FlashcardDeck } from './flashcard-deck.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlashcardDeckService } from './flashcard-deck.service';

@Module({
    imports: [TypeOrmModule.forFeature([FlashcardDeck])],
    providers: [FlashcardDeckService],
})
export class FlashcardDeckModule {}
