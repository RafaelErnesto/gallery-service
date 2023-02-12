import { IsAlphanumeric, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateImageDTO {
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsAlphanumeric()
  description?: string;
  @IsString()
  @IsNotEmpty()
  status?: string;
  @IsString()
  listId?: string;
}
