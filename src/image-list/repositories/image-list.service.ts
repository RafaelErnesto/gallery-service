import { ImageList } from '../entities/image-list';

export abstract class ImageListRepository {
  abstract create(data: ImageList): Promise<ImageList>;
}
