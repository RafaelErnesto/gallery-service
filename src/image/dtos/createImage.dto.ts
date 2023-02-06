import { IsString } from 'class-validator';

export class CreateImageDTO {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  status?: string;
  @IsString()
  listId?: string;
}
