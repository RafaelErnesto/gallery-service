import { ImageStatus } from '../enums/image-status.enum';

export class ImageDTO {
  id: string;
  name: string;
  description?: string;
  status: ImageStatus;
  userId: string;
  listId?: string[];
  fileId: string;
}
