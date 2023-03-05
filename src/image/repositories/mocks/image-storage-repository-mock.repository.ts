import { ImageStorageRepositoryService } from '../image-storage.repository';

export class ImageStorageRepositoryMock extends ImageStorageRepositoryService {
  save(image: Express.Multer.File): Promise<string> {
    return;
  }
}
