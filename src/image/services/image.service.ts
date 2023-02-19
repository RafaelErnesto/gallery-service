import { Injectable } from '@nestjs/common';
import { GetAllImageDTO } from '../dtos/getAllImages.dto';
import { GetImageDTO } from '../dtos/getImage.dto';
import { NewImageDTO } from '../dtos/newImage.dto';
import { UpdateImageDTO } from '../dtos/updateImage.dto';
import { Image } from '../entities/image.entity';
import { ImageRepositoryService } from '../repositories/ImageRepository.service';
import { ImageStorageRepositoryService } from '../repositories/ImageStorageRepository.service';

@Injectable()
export class ImageService {
  constructor(
    private imageRepository: ImageRepositoryService,
    private imageStorageRepository: ImageStorageRepositoryService,
  ) {}

  async create(newImage: NewImageDTO): Promise<Image> {
    const savedImageId = await this.imageStorageRepository.save(newImage.file);

    const imageData = Object.assign({}, newImage) as unknown as Image;
    imageData.fileId = savedImageId;

    await this.imageRepository.save(imageData);
    return imageData;
  }

  async getImage(imageId: string): Promise<GetImageDTO> {
    const result = await this.imageRepository.get(imageId);
    if (result == null) {
      throw new Error('Image not found');
    }
    return Object.assign(new GetImageDTO(), result);
  }

  async getAll(userId: string): Promise<GetAllImageDTO> {
    const result = await this.imageRepository.getAll(userId);
    return Object.assign({} as GetAllImageDTO, {
      images: result,
      quantity: result.length,
      total: 0,
    });
  }

  async update(updateImage: UpdateImageDTO): Promise<Image> {
    const imageToUpdate = await this.imageRepository.get(updateImage.imageId);
    if (imageToUpdate == null) throw new Error('Image not found');
    const newImageData = Object.assign(
      imageToUpdate,
      updateImage,
    ) as unknown as Image;

    return await this.imageRepository.update(newImageData);
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
