import {
  IsAlphanumeric,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateImageListRequestDTO {
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  @IsOptional()
  name?: string;
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  @IsOptional()
  description?: string;
}
