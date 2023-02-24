import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageModule } from './image/image.module';
import { ImageListModule } from './image-list/image-list.module';

@Module({
  imports: [ImageModule, ImageListModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
