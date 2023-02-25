import { ImageList } from '../entities/image-list';

export class GetAllImageListDTO {
  lists: ImageList[];
  count: number;
  total: number;

  constructor(lists: ImageList[], count: number, total: number) {
    this.lists = lists;
    this.count = count;
    this.total = total;
  }
}
