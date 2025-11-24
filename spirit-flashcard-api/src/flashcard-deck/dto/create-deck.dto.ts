import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDeckDTO{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsOptional()
    @IsString()
    description: string

}