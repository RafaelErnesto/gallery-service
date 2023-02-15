import { Image } from '../entities/image.entity';
import { ImageRepositoryService } from './ImageRepository.service';

export class ImageRepositoryMock extends ImageRepositoryService {
  save(image: Image): Promise<null> {
    return null;
  }
}
