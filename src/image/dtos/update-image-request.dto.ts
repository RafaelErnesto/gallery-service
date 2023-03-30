import {
  IsAlphanumeric,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateImageRequestDTO {
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  @IsOptional()
  name: string;
  @IsString()
  @IsAlphanumeric()
  @IsOptional()
  description?: string;
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  @IsOptional()
  status?: string;
  @IsString()
  @IsAlphanumeric()
  @IsOptional()
  listId?: string;
}
