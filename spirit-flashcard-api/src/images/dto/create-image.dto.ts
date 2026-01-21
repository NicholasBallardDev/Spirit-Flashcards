import { IsString, IsNotEmpty, IsNumber, IsUrl } from 'class-validator';

export class CreateImageDto {
  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  mimetype: string;

  @IsNumber()
  size: number;
}
