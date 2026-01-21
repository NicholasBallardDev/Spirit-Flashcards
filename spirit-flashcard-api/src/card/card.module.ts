import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { CardService } from './card.service';
import { ScheduleModule } from '@src/schedule/schedule.module';
import { ImagesModule } from '@src/images/images.module';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), ScheduleModule, ImagesModule],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
