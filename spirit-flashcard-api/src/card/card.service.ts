import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { Repository } from 'typeorm';
import { CreateCardDTO } from './dto/create-card.dto';
import { FlashcardDeck } from '@src/flashcard-deck/flashcard-deck.entity';
import { UpdateCardDTO } from './dto/update-card.dto';

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(Card)
        private cardRepository: Repository<Card>,
    ){}

    async findAll(){
        return this.cardRepository.find({ relations: ['deck'] });
    }

    async findOne(id: number){
        return this.cardRepository.findOne({where: { id }});
    }

    async findDeck(deckId: number){
        this.cardRepository.find({
            where: { deck: { id: deckId } }, 
            relations: ['deck'],})
    }

    async create(dto: CreateCardDTO){
        const card = this.cardRepository.create({ 
            question: dto.question, 
            answer: dto.answer,
            deck: dto.deckId ? {id: dto.deckId} as FlashcardDeck : undefined,
        });
        await this.cardRepository.save(card);
    }

    async update(id: number, dto: UpdateCardDTO){
        await this.cardRepository.update(id, { 
            question: dto.question,
            answer: dto.answer,
            deck: dto.deckId ? {id: dto.deckId} as FlashcardDeck : undefined
         })
        return this.cardRepository.findOne({ where: { id }, relations: ['deck'] })
    }
    
    async delete(id: number){
        const result = await this.cardRepository.delete(id);
        if(result.affected === 0){
            throw Error(`Item with the id of ${id} was not found`)
        }
        return { message: `Deletion Successful: Item with the id of ${id} was deleted`}
    }
}
