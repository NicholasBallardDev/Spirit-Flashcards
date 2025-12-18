import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCardDTO {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  answer: string;

  @IsOptional()
  @IsInt()
  deckId?: number;
}
