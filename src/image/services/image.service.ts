import { Injectable } from '@nestjs/common';
import { GetImageDTO } from '../dtos/getImage.dto';
import { NewImageDTO } from '../dtos/newImage.dto';
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
    return Object.assign(new GetImageDTO(), result);
  }
}
