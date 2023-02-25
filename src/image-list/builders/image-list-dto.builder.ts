import { ImageListDTO } from '../dtos/image-list.dto';
import { ImageListStatus } from '../entities/image-list-status.enum';

export class ImageListDTOBuilder implements ImageListDTO {
  id: string;
  name: string;
  userId: string;
  status: ImageListStatus;
  description?: string;

  withId(value: string): this {
    return Object.assign(this, { id: value });
  }

  withName(value: string): this {
    return Object.assign(this, { name: value });
  }

  withUserId(value: string): this {
    return Object.assign(this, { userId: value });
  }

  withStatus(value: ImageListStatus): this {
    return Object.assign(this, { status: value });
  }

  withDescription(value: string): this {
    return Object.assign(this, { description: value });
  }

  build(): ImageListDTO {
    return new ImageListDTO(this);
  }
}
