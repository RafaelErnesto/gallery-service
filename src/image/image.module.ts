import { Module } from '@nestjs/common';
import { ImageController } from './controllers/image.controller';
import { DynamoDbImageRepository } from './repositories/dynamodb-image.repository';
import { ImageRepositoryService } from './repositories/image.repository';
import { ImageStorageRepositoryService } from './repositories/image-storage.repository';
import { S3Repository } from './repositories/s3-repository';
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
