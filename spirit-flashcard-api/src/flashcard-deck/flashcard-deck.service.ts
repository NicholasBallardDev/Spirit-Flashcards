import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlashcardDeck } from './flashcard-deck.entity';
import { CreateDeckDTO } from './dto/create-deck.dto';
import { UpdateDeckDTO } from './dto/update-deck.dto';

@Injectable()
export class FlashcardDeckService {
    constructor(
        @InjectRepository(FlashcardDeck)
        private deckRepository: Repository<FlashcardDeck>
    ){}

    async findAll(){
        return this.deckRepository.find()
    }

    async getCards(id: number){
        return this.deckRepository.findOne({
            where: { id },
            relations: ['cards']
        })
    }

    async create(dto: CreateDeckDTO){
        const deck = this.deckRepository.create({
            name: dto.name,
            description: dto.description,
        })
        await this.deckRepository.save(deck)
        return deck
    }
    
    async update(id: number, dto: UpdateDeckDTO){
        const result = await this.deckRepository.update(id, {
            name: dto.name,
            description: dto.description
        })

        if (result.affected === 0){
            throw Error(`Failure: Item with Id ${id} not found`);
        }

        return this.deckRepository.findOne({ where: { id } })
    }

    async delete(id: number){
        const result = await this.deckRepository.delete(id);
        
        if (result.affected === 0){
            throw Error(`Failure: Item with Id ${id} not found`);
        }

        return { message: `Delete Successful: Item with Id ${id} was deleted` }
    }

}
