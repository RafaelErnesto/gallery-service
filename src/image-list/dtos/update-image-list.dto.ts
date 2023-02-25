import { ImageListStatus } from '../entities/image-list-status.enum';

export class UpdateImageListDTO {
  id: string;
  name?: string;
  status?: ImageListStatus;
  description?: string;
}
