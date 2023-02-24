import { Injectable } from '@nestjs/common';
import { ImageListDTO } from '../dtos/image-list.dto';
import { NewImageListDTO } from '../dtos/new-image-list.dto';
import { ImageList } from '../entities/image-list';
import { ImageListRepository } from '../repositories/image-list.service';

@Injectable()
export class ImageListService {
  constructor(private repository: ImageListRepository) {}

  async create(newImageListDto: NewImageListDTO): Promise<ImageListDTO> {
    const newImageList = Object.assign({}, newImageListDto) as ImageList;
    const imageList = await this.repository.create(newImageList);
    return Object.assign({} as ImageListDTO, imageList);
  }
}
