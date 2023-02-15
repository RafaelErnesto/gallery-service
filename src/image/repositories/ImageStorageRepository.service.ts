import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class ImageStorageRepositoryService {
  abstract save(image: Express.Multer.File): Promise<string>;
}
