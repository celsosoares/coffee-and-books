import { IsBoolean, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsInt()
  @Min(0)
  quantity: number;

  @IsBoolean()
  isAvailable: boolean;

  @IsString()
  @IsNotEmpty()
  locality: string;
}
