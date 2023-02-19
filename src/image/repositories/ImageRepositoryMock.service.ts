import { Image } from '../entities/image.entity';
import { ImageRepositoryService } from './ImageRepository.service';

export class ImageRepositoryMock extends ImageRepositoryService {
  delete(imageId: string): Promise<null> {
    throw new Error('Method not implemented.');
  }
  update(updatedData: Image): Promise<Image> {
    throw new Error('Method not implemented.');
  }
  getAll(userId: string): Promise<Image[]> {
    throw new Error('Method not implemented.');
  }
  get(imageId: string): Promise<Image> {
    throw new Error('Method not implemented.');
  }
  save(image: Image): Promise<null> {
    return null;
  }
}
