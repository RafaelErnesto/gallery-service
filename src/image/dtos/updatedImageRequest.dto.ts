import { IsString } from 'class-validator';

export class UpdateImageRequestDTO {
  @IsString()
  name: string;
  @IsString()
  description?: string;
  @IsString()
  status?: string;
  @IsString()
  listId?: string;
}
