import { IsEmail, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCardDTO{
    @IsNotEmpty()
    question: string

    @IsNotEmpty()
    answer: string

    @IsOptional()
    @IsInt()
    deckId?: number
}