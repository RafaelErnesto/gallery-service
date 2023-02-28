import { Module } from '@nestjs/common';
import { ImageController } from './controllers/image.controller';
import { MongoDbImageRepository } from './repositories/mongodb-image.repository';
import { ImageRepositoryService } from './repositories/image.repository';
import { ImageStorageRepositoryService } from './repositories/image-storage.repository';
import { S3Repository } from './repositories/s3-repository';
import { ImageService } from './services/image.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema, Image } from './database/schemas/image.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
  ],
  controllers: [ImageController],
  providers: [
    { provide: ImageService, useClass: ImageService },
    { provide: ImageRepositoryService, useClass: MongoDbImageRepository },
    { provide: ImageStorageRepositoryService, useClass: S3Repository },
  ],
})
export class ImageModule {}
