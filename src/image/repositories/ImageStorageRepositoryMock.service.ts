import { ImageStorageRepositoryService } from "./ImageStorageRepository.service";

export class ImageStorageRepositoryMock extends ImageStorageRepositoryService {
  save(image: Express.Multer.File): Promise<String> {
    return
  }
}
