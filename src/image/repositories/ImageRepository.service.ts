import { Injectable } from '@nestjs/common';
import { Image } from '../entities/image.entity';

@Injectable()
export abstract class ImageRepositoryService {
  abstract save(image: Image): Promise<null>;
}
