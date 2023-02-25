import { ImageListStatus } from '../entities/image-list-status.enum';

export class ImageListDTO {
  id: string;
  name: string;
  userId: string;
  status: ImageListStatus;
  description?: string;
}
