import { ImageList } from '../entities/image-list';

export abstract class ImageListRepository {
  abstract get(id: string): Promise<ImageList>;
  abstract getAll(userId: string): Promise<ImageList[]>;
  abstract create(data: ImageList): Promise<ImageList>;
  abstract update(data: ImageList): Promise<ImageList>;
}
