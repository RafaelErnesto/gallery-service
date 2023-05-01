import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImageModule } from './image/image.module';
import { ImageListModule } from './image-list/image-list.module';
import { getMongooseModule } from './utils/mongodb.utils';
import configuration from './config/configuration';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration]
  }), ImageModule, ImageListModule, getMongooseModule()],
})
export class AppModule { }
