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
    const imageFound = await this.imageModel.findById(id);
    if (!imageFound) return null;
    return this.parseToImage(imageFound);
  }
  async getAll(userId: string): Promise<Image[]> {
    const result = await this.imageModel.find({ userId: userId });
    if (!result) return [];
    return result.map((item) => this.parseToImage(item));
  }
  async update(updateData: Image): Promise<Image> {
    const updatedImage = await this.imageModel.findByIdAndUpdate(
      updateData.id,
      updateData,
    );
    return this.parseToImage(updatedImage);
  }
  async delete(id: string): Promise<null> {
    await this.imageModel.findByIdAndDelete(id);
    return null;
  }
  async save(image: Image): Promise<Image> {
    const createdImage = await this.imageModel.create(image);
    return this.parseToImage(createdImage);
  }

  private parseToImage(data) {
    return Object.assign({} as Image, {
      id: data._id,
      name: data.name,
      fileId: data.fileId,
      description: data.description,
      listId: data.listId,
      status: data.status,
      userId: data.userId,
    });
  }
}
