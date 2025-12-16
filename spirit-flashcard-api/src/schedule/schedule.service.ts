import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './card-schedule.entity';
import { createEmptyCard, FSRS, generatorParameters, State, fsrs  } from 'ts-fsrs';
import { Repository } from 'typeorm';

@Injectable()
export class ScheduleService {
    constructor(
        @InjectRepository(Schedule)
        private scheduleRepository: Repository<Schedule>,
    ) {}

    findOne(id: number){
        return this.scheduleRepository.findOne({ where: {id}, relations: ['card'] } )
    }

    create(): Schedule {
        const card = createEmptyCard(new Date());

        return this.scheduleRepository.create({
            due: card.due,
            stability: card.stability,
            difficulty: card.difficulty,
            scheduled_days: card.scheduled_days,
            elapsed_days: card.elapsed_days,
            learning_steps: card.learning_steps,
            reps: card.reps,
            lapses: card.lapses,
            state: card.state,
        });
    }

    async update(id: number, state: State) {
        const params = generatorParameters({});
        const card = await this.findOne(id);
        const f = fsrs(params)
        const now = new Date()

        if (card){
            const scheduler = f.repeat(card.toSchedulingCard(), now)
            const scheduledCard = scheduler[state].card
            const result = await this.scheduleRepository.update(id, {
                ...scheduledCard,
                last_review: now
            })

            return result
        } else {
             throw Error(`Item with the id of ${id} was not found`) 
        }
    }
}
