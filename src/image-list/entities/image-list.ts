import { ImageListStatus } from './image-list-status.enum';

export class ImageList {
  id?: string;
  name: string;
  userId: string;
  status: ImageListStatus;
  description?: string;
}
