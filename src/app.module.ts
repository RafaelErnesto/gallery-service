import { Module } from '@nestjs/common';
import { ImageModule } from './image/image.module';
import { ImageListModule } from './image-list/image-list.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ImageModule,
    ImageListModule,
    MongooseModule.forRoot('mongodb://local-db:27017/local'),
  ],
})
export class AppModule {}
