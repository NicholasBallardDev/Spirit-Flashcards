import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FlashcardDeckService } from './flashcard-deck.service';
import { CreateDeckDTO } from './dto/create-deck.dto';
import { UpdateDeckDTO } from './dto/update-deck.dto';

@Controller('decks')
export class FlashcardDeckController {
    constructor(private readonly deckService: FlashcardDeckService){}

    @Get()
    async findAll(){
        return this.deckService.findAll();
    }

    @Get(":id")
    async findOne(@Param('id') id: number){
        return this.deckService.getCards(id);
    }

    @Post()
    async create(@Body() dto: CreateDeckDTO){
        return this.deckService.create(dto);
    }

    @Put(":id")
    async update(@Param('id') id: number, @Body() dto: UpdateDeckDTO){
        return this.deckService.update(id, dto);
    }

    @Delete(":id")
    async delete(@Param('id') id: number){
        return this.deckService.delete(id);
    }
}
