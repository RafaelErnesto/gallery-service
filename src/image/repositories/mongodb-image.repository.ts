import { InjectModel } from '@nestjs/mongoose';
import { Image } from '../entities/image.entity';
import { ImageRepositoryService } from './image.repository';
import { Image as ImageModel } from '../database/schemas/image.schema';
import { ImageDocument } from '../database/schemas/image.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MongoDbImageRepository extends ImageRepositoryService {
  constructor(
    @InjectModel(ImageModel.name) private imageModel: Model<ImageDocument>,
  ) {
    super();
  }
  async get(id: string): Promise<Image> {
    const imageFound = await this.imageModel.findById(id).exec();
    if (!imageFound) return null;
    return Object.assign({} as Image, {
      id: imageFound._id,
      name: imageFound.name,
      fileId: imageFound.fileId,
      description: imageFound.description,
      listId: imageFound.listId,
      status: imageFound.status,
      userId: imageFound.userId,
    });
  }
  async getAll(userId: string): Promise<Image[]> {
    return await this.imageModel.find({ userId: userId }).exec();
  }
  async update(updateData: Image): Promise<Image> {
    const updatedImage = await this.imageModel.findByIdAndUpdate(
      updateData.id,
      updateData,
    );
    return Object.assign({} as Image, updatedImage);
  }
  async delete(id: string): Promise<null> {
    await this.imageModel.findByIdAndDelete(id);
    return null;
  }
  async save(image: Image): Promise<Image> {
    const createdImage = await this.imageModel.create(image);
    return Object.assign({} as Image, {
      id: createdImage._id,
      name: createdImage.name,
      fileId: createdImage.fileId,
      description: createdImage.description,
      listId: createdImage.listId,
      status: createdImage.status,
      userId: createdImage.userId,
    });
  }
}
