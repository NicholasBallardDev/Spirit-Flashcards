import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { CardService } from './card.service';
import { ScheduleModule } from '@src/schedule/schedule.module';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), ScheduleModule], // Import ScheduleModule here
  controllers: [CardController],
  providers: [CardService] // Remove ScheduleService from providers, it's provided by ScheduleModule
})
export class CardModule {}
