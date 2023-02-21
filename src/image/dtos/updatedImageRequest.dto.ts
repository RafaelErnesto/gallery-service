import { IsAlphanumeric, IsNotEmpty, IsString } from 'class-validator';

export class UpdateImageRequestDTO {
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsAlphanumeric()
  description?: string;
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  status?: string;
  @IsString()
  @IsAlphanumeric()
  listId?: string;
}
