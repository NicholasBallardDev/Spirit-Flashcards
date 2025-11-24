import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCardDTO{
    @IsOptional()
    @IsNotEmpty()
    question: string

    @IsOptional()
    @IsNotEmpty()
    answer: string

    @IsOptional()
    @IsInt()
    deckId?: number
}