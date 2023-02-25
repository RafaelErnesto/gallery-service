import { ImageList } from '../entities/image-list';
import { ImageListRepository } from './image-list.repository';

export class ImageListRepositoryMock extends ImageListRepository {
  getByName(name: string): Promise<ImageList> {
    throw new Error('Method not implemented.');
  }
  get(id: string): Promise<ImageList> {
    throw new Error('Method not implemented.');
  }
  getAll(userId: string): Promise<ImageList[]> {
    throw new Error('Method not implemented.');
  }
  create(data: ImageList): Promise<ImageList> {
    throw new Error('Method not implemented.');
  }
  update(data: ImageList): Promise<ImageList> {
    throw new Error('Method not implemented.');
  }
  delete(data: ImageList): Promise<null> {
    throw new Error('Method not implemented.');
  }
}
