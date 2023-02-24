import { Module } from '@nestjs/common';
import { ImageListController } from './controllers/image-list.controller';
import { ImageListService } from './services/image-list-service';

@Module({
  controllers: [ImageListController],
  providers: [ImageListService],
})
export class ImageListModule {}
