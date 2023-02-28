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
  async get(imageId: string): Promise<Image> {
    const foundImage = await this.imageModel.findById(imageId).exec();
    return Object.assign({} as Image, foundImage);
  }
  async getAll(userId: string): Promise<Image[]> {
    return await this.imageModel.find({ userId: userId }).exec();
  }
  async update(updateData: Image): Promise<Image> {
    return await this.imageModel.updateOne({ id: updateData.id }, updatedData);
  }
  delete(imageId: string): Promise<null> {
    throw new Error('Method not implemented.');
  }
  save(image: Image): Promise<null> {
    throw new Error('Method not implemented.');
  }
}
