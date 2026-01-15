import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDTO } from './dto/create-card.dto';
import { UpdateCardDTO } from './dto/update-card.dto';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}
  @Get()
  async getAllCards() {
    return this.cardService.findAll();
  }

  @Get('due')
  async findAllDue() {
    return this.cardService.findAllDue();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.cardService.findOne(id);
  }

  @Get('/deck/:deckId')
  async findDeck(@Param('deckId') deckId: number) {
    return this.cardService.findDeck(deckId);
  }

  @Post()
  async create(@Body() dto: CreateCardDTO) {
    return this.cardService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateCardDTO) {
    return this.cardService.update(id, dto);
  }

  @Delete(':id')
  async deleteCard(@Param('id') id: number) {
    return this.cardService.delete(id);
  }
}
