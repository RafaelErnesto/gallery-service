import { Injectable } from '@nestjs/common';
import { ImageListDTOBuilder } from '../builders/image-list-dto.builder';
import { GetAllImageListDTO } from '../dtos/get-all-image-list.dto';
import { ImageListDTO } from '../dtos/image-list.dto';
import { NewImageListDTO } from '../dtos/new-image-list.dto';
import { UpdateImageListDTO } from '../dtos/update-image-list.dto';
import { ImageList } from '../entities/image-list';
import { ImageListRepository } from '../repositories/image-list.repository';

@Injectable()
export class ImageListService {
  constructor(private repository: ImageListRepository) {}

  async getAll(userId: string): Promise<GetAllImageListDTO> {
    const imageListsFound = await this.repository.getAll(userId);
    return new GetAllImageListDTO(imageListsFound, imageListsFound.length, 0);
  }

  async get(id: string): Promise<ImageListDTO> {
    const imageListFound = await this.repository.get(id);
    if (!imageListFound) {
      throw new Error('The list was not found');
    }
    return new ImageListDTOBuilder()
      .withId(imageListFound.id)
      .withName(imageListFound.name)
      .withUserId(imageListFound.userId)
      .withDescription(imageListFound.description)
      .withStatus(imageListFound.status)
      .build();
  }

  async create(newImageListDto: NewImageListDTO): Promise<ImageListDTO> {
    const imageListFound = await this.repository.getByName(
      newImageListDto.name,
    );
    if (imageListFound) {
      throw new Error('List already exists');
    }
    const newImageList = Object.assign({}, newImageListDto) as ImageList;
    const imageList = await this.repository.create(newImageList);
    return new ImageListDTOBuilder()
      .withId(imageList.id)
      .withName(imageList.name)
      .withUserId(imageList.userId)
      .withDescription(imageList.description)
      .withStatus(imageList.status)
      .build();
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

    return new ImageListDTOBuilder()
      .withId(imageList.id)
      .withName(imageList.name)
      .withUserId(imageList.userId)
      .withDescription(imageList.description)
      .withStatus(imageList.status)
      .build();
  }

  async delete(id: string) {
    const imageListToDelete = await this.repository.get(id);
    if (!imageListToDelete) {
      throw new Error('The list was not found');
    }
    const inactiveImageList = Object.assign(imageListToDelete, {
      status: 'INACTIVE',
    }) as ImageList;
    await this.repository.delete(inactiveImageList);
  }
}
