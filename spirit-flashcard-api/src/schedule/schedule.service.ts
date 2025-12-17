import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './card-schedule.entity';
import { createEmptyCard, generatorParameters, fsrs, Rating, State  } from 'ts-fsrs';
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

    findAll(){
        return this.scheduleRepository.find({ relations: ['card'] })
    }

    getByState(state: State){
        return this.scheduleRepository.find({ where: {state}, relations: ['card'] })
    }

    create(): Schedule {
        const card = createEmptyCard();

        const result = this.scheduleRepository.create({
            ...card,
        });

        return result
    }

    async update(id: number, rating: Rating) {
        const params = generatorParameters({});
        const card = await this.findOne(id);
        const f = fsrs(params)
        const now = new Date()

        if (card){
            const scheduler = f.repeat(card.toSchedulingCard(), now)
            const scheduledCard = scheduler[rating].card
            const result = await this.scheduleRepository.update(id, {
                ...scheduledCard,
                last_review: now
            })

            return result
        } else {
             throw new NotFoundException(`Item with the id of ${id} was not found`);
        }
    }
}
