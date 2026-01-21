import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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

  @Get('count')
  async countCards() {
    return this.cardService.countCards();
  }

  @Get('due')
  async findAllDue() {
    return this.cardService.findAllDue();
  }

  @Get('due/count')
  async countCardsDue() {
    return this.cardService.countCardsDue();
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

  @Put(':id/question-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadQuestionImage(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }
    return this.cardService.setQuestionImage(id, file);
  }

  @Put(':id/answer-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAnswerImage(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }
    return this.cardService.setAnswerImage(id, file);
  }

  @Delete(':id')
  async deleteCard(@Param('id') id: number) {
    return this.cardService.delete(id);
  }
}
