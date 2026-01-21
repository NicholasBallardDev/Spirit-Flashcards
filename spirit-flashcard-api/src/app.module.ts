import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardModule } from './card/card.module';
import { FlashcardDeckModule } from './flashcard-deck/flashcard-deck.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Card } from './card/card.entity';
import { FlashcardDeck } from './flashcard-deck/flashcard-deck.entity';
import { ScheduleModule } from './schedule/schedule.module';
import { Schedule } from './schedule/card-schedule.entity';
import { ImagesModule } from './images/images.module';
import { Image } from './images/entities/image.entity';

const DEFAULT_DB_PORT = 5432;

@Module({
  imports: [
    CardModule,
    FlashcardDeckModule,
    ScheduleModule,
    ImagesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT
        ? parseInt(process.env.DB_PORT)
        : DEFAULT_DB_PORT,
      entities: [Card, FlashcardDeck, Schedule, Image],
      synchronize: true,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
