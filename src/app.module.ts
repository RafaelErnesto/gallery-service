import { Module } from '@nestjs/common';
import { ImageModule } from './image/image.module';
import { ImageListModule } from './image-list/image-list.module';
import { getMongooseModule } from './utils/mongodb.utils';

@Module({
  imports: [ImageModule, ImageListModule, getMongooseModule()],
})
export class AppModule {}
