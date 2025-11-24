import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardModule } from './card/card.module';
import { FlashcardDeckModule } from './flashcard-deck/flashcard-deck.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Card } from './card/card.entity';
import { FlashcardDeck } from './flashcard-deck/flashcard-deck.entity';

@Module({
  imports: [CardModule, FlashcardDeckModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    entities: [Card, FlashcardDeck],
    synchronize: true, //remove in production environment
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
