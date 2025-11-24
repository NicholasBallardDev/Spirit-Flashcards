import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateDeckDTO{
    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    description: string

}