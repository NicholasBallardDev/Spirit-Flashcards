import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Rating, State } from 'ts-fsrs';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  async findAll() {
    return this.scheduleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.scheduleService.findOne(id);
  }

  @Get('state/:state')
  async getByState(@Param('state', ParseIntPipe) state: State) {
    return this.scheduleService.getByState(state);
  }

  @Post()
  async create() {
    return this.scheduleService.create();
  }

  @Put(':id/:rating')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Query('rating', new ParseIntPipe({ errorHttpStatusCode: 400 }))
    rating: Rating,
  ) {
    return this.scheduleService.update(id, rating);
  }
}
