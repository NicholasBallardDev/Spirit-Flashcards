import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCardDTO {
  @IsOptional()
  @IsString()
  question: string;

  @IsOptional()
  @IsString()
  answer: string;

  @IsOptional()
  @IsInt()
  deckId?: number;
}
