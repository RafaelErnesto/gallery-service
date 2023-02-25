import {
  IsAlphanumeric,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateImageListRequestDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId: string;
  @IsString()
  @IsAlphanumeric()
  @IsOptional()
  name?: string;
  @IsString()
  @IsAlphanumeric()
  @IsOptional()
  description?: string;
}
