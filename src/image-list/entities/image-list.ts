import { ImageListStatus } from './image-list-status.enum';

export class ImageList {
  id?: string;
  name: string;
  userId: string;
  status: ImageListStatus;
  description?: string;

  constructor(
    name: string,
    userId: string,
    status: ImageListStatus,
    id?: string,
    description?: string,
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.description = description;
    this.userId = userId;
  }
}
