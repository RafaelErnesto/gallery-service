import { ImageList } from '../entities/image-list';

export class GetAllImageListDTO {
  lists: ImageList[];
  count: number;
  total: number;
}
