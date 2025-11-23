import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardModule } from './card/card.module';
import { FlashcardDeckModule } from './flashcard-deck/flashcard-deck.module';

@Module({
  imports: [CardModule, FlashcardDeckModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
