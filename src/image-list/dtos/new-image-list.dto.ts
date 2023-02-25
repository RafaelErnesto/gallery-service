import { ImageListStatus } from '../entities/image-list-status.enum';

export class NewImageListDTO {
  name: string;
  userId: string;
  status: ImageListStatus;
  description?: string;
}
