import { Module } from '@nestjs/common';
import { ImageListController } from './controllers/image-list.controller';

@Module({
  controllers: [ImageListController],
})
export class ImageListModule {}
