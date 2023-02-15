import { Module } from '@nestjs/common';
import { ImageController } from './controllers/image.controller';
import { DynamoDbImageRepository } from './repositories/DynamoDbImageRepository.service';
import { ImageRepositoryService } from './repositories/ImageRepository.service';
import { ImageStorageRepositoryService } from './repositories/ImageStorageRepository.service';
import { S3Repository } from './repositories/S3Repository.service';
import { ImageService } from './services/image.service';

@Module({
  controllers: [ImageController],
  providers: [
    { provide: ImageService, useClass: ImageService },
    { provide: ImageRepositoryService, useClass: DynamoDbImageRepository },
    { provide: ImageStorageRepositoryService, useClass: S3Repository },
  ],
})
export class ImageModule {}
