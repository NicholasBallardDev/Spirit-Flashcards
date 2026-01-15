import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { FlashcardDeckService } from './flashcard-deck.service';
import { CreateDeckDTO } from './dto/create-deck.dto';
import { UpdateDeckDTO } from './dto/update-deck.dto';

@Controller('decks')
export class FlashcardDeckController {
  constructor(private readonly deckService: FlashcardDeckService) {}

  @Get()
  async findAll() {
    return this.deckService.findAll();
  }

  @Get(':id/cards')
  async getCards(@Param('id', ParseIntPipe) id: number) {
    return this.deckService.getCards(id);
  }

  @Get(':id/due')
  async getDueCards(@Param('id', ParseIntPipe) id: number) {
    return this.deckService.getDueCards(id);
  }

  @Get(':id/due/count')
  async countDueCards(@Param('id', ParseIntPipe) id: number) {
    return this.deckService.countDueCards(id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.deckService.findOne(id); // returns deck info only
  }

  @Post()
  async create(@Body() dto: CreateDeckDTO) {
    return this.deckService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDeckDTO,
  ) {
    return this.deckService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.deckService.delete(id);
  }
}
