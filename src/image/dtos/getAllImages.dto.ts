import { Image } from '../entities/image.entity';
export class GetAllImageDTO {
  images: Image[];
  quantity: number;
  total: number;
}
