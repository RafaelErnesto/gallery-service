import { ImageStorageRepositoryService } from './ImageStorageRepository.service';

export class S3Repository extends ImageStorageRepositoryService {
  save(image: Express.Multer.File): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
