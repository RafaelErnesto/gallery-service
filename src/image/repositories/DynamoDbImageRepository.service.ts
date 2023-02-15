import { Image } from '../entities/image.entity';
import { ImageRepositoryService } from './ImageRepository.service';

export class DynamoDbImageRepository extends ImageRepositoryService {
  save(image: Image): Promise<null> {
    throw new Error('Method not implemented.');
  }
}
