import { IsAlphanumeric, IsNotEmpty, IsString } from 'class-validator';

export class UpdateImageListRequestDTO {
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @IsAlphanumeric()
  name?: string;
  @IsString()
  @IsAlphanumeric()
  description?: string;
}
