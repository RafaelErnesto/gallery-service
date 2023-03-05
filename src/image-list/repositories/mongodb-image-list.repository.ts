import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImageListDocument } from '../database/schemas/image-list.schema';
import { ImageList } from '../entities/image-list';
import { ImageListRepository } from './image-list.repository';

export class MongoDbImageListRepository extends ImageListRepository {
  constructor(
    @InjectModel(ImageList.name)
    private imageListModel: Model<ImageListDocument>,
  ) {
    super();
  }
  async get(id: string): Promise<ImageList> {
    const imageListFound = await this.imageListModel.findById(id);
    if (!imageListFound) return null;
    return this.parseToImageList(imageListFound);
  }
  async getAll(userId: string): Promise<ImageList[]> {
    const result = await this.imageListModel.find({ userId: userId });
    if (!result) return [];
    return result.map((item) => this.parseToImageList(item));
  }
  async getByName(name: string): Promise<ImageList> {
    const imageListFound = await this.imageListModel.findOne({ name: name });
    if (!imageListFound) return null;
    return this.parseToImageList(imageListFound);
  }
  async create(data: ImageList): Promise<ImageList> {
    const createdImage = await this.imageListModel.create(data);
    return this.parseToImageList(createdImage);
  }
  async update(data: ImageList): Promise<ImageList> {
    const foundImageList = await this.imageListModel.findByIdAndUpdate(
      data.id,
      data,
    );
    if (!foundImageList) return null;
    return this.parseToImageList(data);
  }
  async delete(data: ImageList): Promise<null> {
    await this.imageListModel.findByIdAndDelete(data.id);
    return null;
  }

  private parseToImageList(data) {
    return Object.assign({} as ImageList, {
      id: data._id,
      name: data.name,
      status: data.status,
      description: data.description,
      userId: data.userId,
    });
  }
}
