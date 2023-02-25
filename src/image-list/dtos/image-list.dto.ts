import { ImageListStatus } from '../entities/image-list-status.enum';
export interface ImageListDTO {
  id: string;
  name: string;
  userId: string;
  status: ImageListStatus;
  description?: string;
}
export class ImageListDTO implements ImageListDTO {
  id: string;
  name: string;
  userId: string;
  status: ImageListStatus;
  description?: string;

  constructor(data: ImageListDTO) {
    Object.assign(this, data);
  }
}
