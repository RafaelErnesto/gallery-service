import { ImageStatus } from '../enums/image-status.enum';

export class Image {
  id: string;
  name: string;
  description?: string;
  status: ImageStatus;
  userId: string;
  listId?: string[];
  fileId: string;
}
