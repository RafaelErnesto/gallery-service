import { ImageDTO } from '../dtos/image.dto';
import { ImageRepositoryService } from './ImageRepository.service';

export class DynamoDbImageRepository extends ImageRepositoryService {
  save(image: ImageDTO): Promise<null> {
    throw new Error('Method not implemented.');
  }
}
