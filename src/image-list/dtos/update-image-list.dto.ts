import { ImageListStatus } from '../entities/image-list-status.enum';

export class UpdateImageListDTO {
  id: string;
  name?: string;
  status?: ImageListStatus;
  description?: string;

  constructor(
    id: string,
    name?: string,
    status?: ImageListStatus,
    description?: string,
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.description = description;
  }
}
