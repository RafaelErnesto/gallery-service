import {
  IsAlphanumeric,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateImageRequestDTO {
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  @MinLength(5)
  name: string;
  @IsString()
  @IsAlphanumeric()
  @IsOptional()
  description?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  status?: string;
  @IsString()
  @IsOptional()
  listId?: string;
}
