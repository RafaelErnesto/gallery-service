import { Injectable } from '@nestjs/common';
import { GetAllImageDTO } from '../dtos/get-all-images.dto';
import { NewImageDTO } from '../dtos/new-image.dto';
import { UpdateImageDTO } from '../dtos/update-image.dto';
import { Image } from '../entities/image.entity';
import { ImageRepositoryService } from '../repositories/image.repository';
import { ImageStorageRepositoryService } from '../repositories/image-storage.repository';
import { ImageDTO } from '../dtos/image.dto';

@Injectable()
export class ImageService {
  constructor(
    private imageRepository: ImageRepositoryService,
    private imageStorageRepository: ImageStorageRepositoryService,
  ) {}

  async create(newImage: NewImageDTO): Promise<ImageDTO> {
    const savedImageId = await this.imageStorageRepository.save(newImage.file);

    const imageData = Object.assign({}, newImage) as unknown as Image;
    imageData.fileId = savedImageId;

    const createdImage = await this.imageRepository.save(imageData);
    return Object.assign({} as ImageDTO, createdImage);
  }

  async getImage(imageId: string): Promise<ImageDTO> {
    const result = await this.imageRepository.get(imageId);
    if (result == null) {
      throw new Error('Image not found');
    }
    return Object.assign({} as ImageDTO, result);
  }

  async getAll(userId: string): Promise<GetAllImageDTO> {
    const result = await this.imageRepository.getAll(userId);
    return Object.assign({} as GetAllImageDTO, {
      images: result,
      quantity: result.length,
      total: 0,
    });
  }

  async update(updateImage: UpdateImageDTO): Promise<ImageDTO> {
    const imageToUpdate = await this.imageRepository.get(updateImage.id);
    if (imageToUpdate == null) throw new Error('Image not found');

    const newImageData = Object.assign(
      imageToUpdate,
      updateImage,
    ) as unknown as Image;

    const updatedImage = await this.imageRepository.update(newImageData);
    return Object.assign({} as ImageDTO, {
      imageId: updatedImage.id,
      ...updatedImage,
    });
  }

  async delete(imageId: string): Promise<null> {
    const imageToDelete = await this.imageRepository.get(imageId);
    if (imageToDelete == null) {
      throw new Error('Image not found');
    }

    await this.imageRepository.delete(imageToDelete.id);
    return null;
  }
}
