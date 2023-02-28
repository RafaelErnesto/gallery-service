import { Module } from '@nestjs/common';
import { ImageModule } from './image/image.module';
import { ImageListModule } from './image-list/image-list.module';
import { ImageListController } from './image-list/controllers/image-list.controller';
import { ImageController } from './image/controllers/image.controller';

@Module({
  imports: [ImageModule, ImageListModule],
  controllers: [ImageListController, ImageController],
})
export class AppModule {}
