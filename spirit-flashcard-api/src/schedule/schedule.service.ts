import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './card-schedule.entity';
import { createEmptyCard, State } from 'ts-fsrs';
import { Repository } from 'typeorm';

@Injectable()
export class ScheduleService {
    constructor(
        @InjectRepository(Schedule)
        private scheduleRepository: Repository<Schedule>,
    ) {}

    create(): Schedule {
        const card = createEmptyCard(new Date());

        return this.scheduleRepository.create({
            due: card.due,
            stability: card.stability,
            difficulty: card.difficulty,
            scheduled_days: card.scheduled_days,
            learning_steps: card.learning_steps,
            reps: card.reps,
            lapses: card.lapses,
            state: card.state,
        });
    }

    update(): Schedule {
        return new Schedule()
    }
}
