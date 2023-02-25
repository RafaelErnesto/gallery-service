import { Module } from '@nestjs/common';
import { ImageListController } from './controllers/image-list.controller';
import { DynamoDbImageListRepository } from './repositories/DynamoDbImageListRepository.repository';
import { ImageListRepository } from './repositories/image-list.repository';
import { ImageListService } from './services/image-list-service';

@Module({
  controllers: [ImageListController],
  providers: [
    { provide: ImageListService, useClass: ImageListService },
    { provide: ImageListRepository, useClass: DynamoDbImageListRepository },
  ],
})
export class ImageListModule {}
