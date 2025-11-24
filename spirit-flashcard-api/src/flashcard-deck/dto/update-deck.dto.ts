import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDeckDTO{
    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    description: string

}