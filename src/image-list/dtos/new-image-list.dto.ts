import { IsAlphanumeric, IsNotEmpty, IsString } from 'class-validator';

export class NewImageListDTO {
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  userId: string;
  @IsString()
  description?: string;

  constructor(name: string, userId: string, description?: string) {
    this.name = name;
    this.userId = userId;
    this.description = description;
  }
}
