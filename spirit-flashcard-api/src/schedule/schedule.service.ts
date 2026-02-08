import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './card-schedule.entity';
import {
  createEmptyCard,
  generatorParameters,
  fsrs,
  Rating,
  State,
  RecordLog,
  IPreview,
} from 'ts-fsrs';
import { Repository } from 'typeorm';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async findOne(id: number) {
    try {
      return await this.scheduleRepository.findOne({
        where: { id },
        relations: ['card'],
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return await this.scheduleRepository.find({ relations: ['card'] });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getSchedulePreview(id: number) {
    try {
      const card = await this.findOne(id);
      const f = fsrs();
      const now = new Date();

      if (!card) {
        throw new NotFoundException('Card not found');
      }

      return f.repeat(card, now);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  async getByState(state: State) {
    try {
      return await this.scheduleRepository.find({
        where: { state },
        relations: ['card'],
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getByStateAndDeck(state: State, deckId: number) {
    try {
      return await this.scheduleRepository.find({
        where: {
          state,
          card: { deck: { id: deckId } },
        },
        relations: ['card'],
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  create(): Schedule {
    try {
      const card = createEmptyCard();

      const result = this.scheduleRepository.create({
        ...card,
      });

      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, rating: Rating) {
    try {
      const card = await this.findOne(id);
      const f = fsrs();
      const now = new Date();

      if (card) {
        const scheduler = f.repeat(card, now);
        const scheduledCard = scheduler[rating].card;
        const result = await this.scheduleRepository.update(id, {
          ...scheduledCard,
          last_review: now,
        });

        return result;
      } else {
        throw new NotFoundException(`Item with the id of ${id} was not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
}
