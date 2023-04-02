import {
  IsAlphanumeric,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class NewImageListDTO {
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  name: string;
  @IsUUID()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  constructor(name: string, userId: string, description?: string) {
    this.name = name;
    this.userId = userId;
    this.description = description;
  }
}
