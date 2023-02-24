import { Injectable } from '@nestjs/common';
import { GetAllImageListDTO } from '../dtos/get-all-image-list.dto';
import { ImageListDTO } from '../dtos/image-list.dto';
import { NewImageListDTO } from '../dtos/new-image-list.dto';
import { UpdateImageListDTO } from '../dtos/update-image-list.dto';
import { ImageList } from '../entities/image-list';
import { ImageListRepository } from '../repositories/image-list.service';

@Injectable()
export class ImageListService {
  constructor(private repository: ImageListRepository) {}

  async getAll(userId: string): Promise<GetAllImageListDTO> {
    const imageListsFound = await this.repository.getAll(userId);

    return Object.assign({} as ImageListDTO, {
      lists: imageListsFound,
      count: imageListsFound.length,
      total: 0,
    });
  }

  async get(id: string): Promise<ImageListDTO> {
    const imageListFound = await this.repository.get(id);
    if (!imageListFound) {
      throw new Error('The list was not found');
    }
    return Object.assign({} as ImageListDTO, imageListFound);
  }

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
