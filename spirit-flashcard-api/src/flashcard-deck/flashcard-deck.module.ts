import { Module } from '@nestjs/common';
import { FlashcardDeck } from './flashcard-deck.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlashcardDeckService } from './flashcard-deck.service';
import { FlashcardDeckController } from './flashcard-deck.controller';

@Module({
    imports: [TypeOrmModule.forFeature([FlashcardDeck])],
    providers: [FlashcardDeckService],
    controllers: [FlashcardDeckController],
})
export class FlashcardDeckModule {}
