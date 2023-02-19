import { Injectable } from '@nestjs/common';
import { Image } from '../entities/image.entity';

@Injectable()
export abstract class ImageRepositoryService {
  abstract save(image: Image): Promise<null>;
  abstract get(imageId: string): Promise<Image>;
  abstract getAll(userId: string): Promise<Image[]>;
  abstract update(updatedData: Image): Promise<Image>;
}
