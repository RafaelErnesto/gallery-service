import { Injectable } from '@nestjs/common';
import { NewImageDTO } from '../dtos/newImage.dto';
import { ImageDTO } from '../dtos/image.dto';
import { ImageRepositoryService } from '../repositories/ImageRepository.service';
import { ImageStorageRepositoryService } from '../repositories/ImageStorageRepository.service';

@Injectable()
export class ImageService {
  constructor(
    private imageRepository: ImageRepositoryService,
    private imageStorageRepository: ImageStorageRepositoryService,
  ) {}

  async create(newImage: NewImageDTO): Promise<ImageDTO> {
    const savedImageId = await this.imageStorageRepository.save(newImage.file);

    const imageData = Object.assign({}, newImage) as unknown as ImageDTO;
    imageData.fileId = savedImageId;

    await this.imageRepository.save(imageData);
    return imageData;
  }
}
