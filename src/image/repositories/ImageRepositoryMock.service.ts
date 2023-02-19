import { Image } from '../entities/image.entity';
import { ImageRepositoryService } from './ImageRepository.service';

export class ImageRepositoryMock extends ImageRepositoryService {
  get(imageId: string): Promise<Image> {
    throw new Error('Method not implemented.');
  }
  save(image: Image): Promise<null> {
    return null;
  }
}
