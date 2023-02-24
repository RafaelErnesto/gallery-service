import { Injectable } from '@nestjs/common';
import { ImageListDTO } from '../dtos/image-list.dto';
import { NewImageListDTO } from '../dtos/new-image-list.dto';
import { UpdateImageListDTO } from '../dtos/update-image-list.dto';
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

  async update(updateImageListDto: UpdateImageListDTO): Promise<ImageListDTO> {
    const imageListToUpdate = await this.repository.get(updateImageListDto.id);
    if (!imageListToUpdate) {
      throw new Error('The list was not found');
    }
    const newImageList = Object.assign(
      imageListToUpdate,
      updateImageListDto,
    ) as ImageList;
    const imageList = await this.repository.update(newImageList);
    return Object.assign({} as ImageListDTO, imageList);
  }
}
