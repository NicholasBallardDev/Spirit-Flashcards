import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('card')
export class CardController {
    @Get()
    async getAllCards(){
        return "This is a card";
    }

    @Post()
    addCard(){
        return "Card has been added";
    }

    @Put()
    updateCard(){
        return "Card has been updated";
    }

    @Delete()
    deleteCard(){
        return "Card has been deleted";
    }
}
