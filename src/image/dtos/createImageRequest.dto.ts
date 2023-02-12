import { IsAlphanumeric, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateImageRequestDTO {
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
