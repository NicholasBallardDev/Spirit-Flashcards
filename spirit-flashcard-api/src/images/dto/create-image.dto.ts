import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateImageDto {
  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString() // 'key' is a string, not a URL
  @IsNotEmpty()
  key: string;
}
