import { ImageStorageRepositoryService } from './image-storage.repository';

export class S3Repository extends ImageStorageRepositoryService {
  save(image: Express.Multer.File): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
