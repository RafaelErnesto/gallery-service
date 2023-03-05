import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../utils/in-memory-mongodb/in-memory-mongodb.utils';

import mongoose from 'mongoose';
import { MongoDbImageListRepository } from './mongodb-image-list.repository';
import { ImageListSchema } from '../database/schemas/image-list.schema';
import { ImageList } from '../entities/image-list';
import { ImageListStatus } from '../entities/image-list-status.enum';

describe('MongoDbImageRepository', () => {
  let repository: MongoDbImageListRepository;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'ImageList', schema: ImageListSchema },
        ]),
      ],
      providers: [MongoDbImageListRepository],
    }).compile();
    repository = module.get<MongoDbImageListRepository>(
      MongoDbImageListRepository,
    );
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  describe('create should', () => {
    it('create ImageList and return the ImageList entity when creation is ok', async () => {
      const imageListToBeSaved = Object.assign({} as ImageList, {
        name: 'Dummy',
        status: ImageListStatus.ACTIVE,
        userId: 'userTestId',
      });
      const savedImageList = await repository.create(imageListToBeSaved);
      expect(savedImageList.name).toBe(imageListToBeSaved.name);
      expect(savedImageList.id).toBeDefined();
    });
  });

  describe('update should', () => {
    it('should return null when image list was not found', async () => {
      const imageListToUpdate = Object.assign({} as ImageList, {
        name: 'Dummy',
        status: ImageListStatus.ACTIVE,
        userId: 'userTestId',
        id: new mongoose.Types.ObjectId().toString(),
      });
      const result = await repository.update(imageListToUpdate);
      expect(result).toBeNull();
    });
    it('update ImageList and return the Image entity when ImageList update is ok', async () => {
      const imageListToSave = Object.assign({} as ImageList, {
        name: 'Dummy',
        status: ImageListStatus.ACTIVE,
        userId: 'userTestId',
        fileId: 'testFileId',
      });
      const savedImageList = await repository.create(imageListToSave);
      savedImageList.name = 'Dummy Updated';
      const updatedImageList = await repository.update(savedImageList);
      expect(updatedImageList.name).toBe('Dummy Updated');
    });
  });
  describe('get should', () => {
    it('return null when the image list does not exist', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const imageListFound = await repository.get(fakeId.toString());
      expect(imageListFound).toBeNull();
    });
    it('return ImageList when the image list exist', async () => {
      const imageList = Object.assign({} as ImageList, {
        name: 'Dummy',
        status: ImageListStatus.ACTIVE,
        userId: 'userTestId',
      });
      const insertedImageList = await repository.create(imageList);
      const imageListFound = await repository.get(insertedImageList.id);
      expect(imageListFound.id).toEqual(insertedImageList.id);
    });
  });
  describe('getAll should', () => {
    it('return empty when there is no image list', async () => {
      const result = await repository.getAll('dummy');
      expect(result.length).toBe(0);
    });
    it('return ImageList when the image list exist', async () => {
      const imageList1 = Object.assign({} as ImageList, {
        name: 'Dummy1',
        status: ImageListStatus.ACTIVE,
        userId: '123',
      });
      const imageList2 = Object.assign({} as ImageList, {
        name: 'Dummy2',
        status: ImageListStatus.ACTIVE,
        userId: '123',
      });
      await repository.create(imageList1);
      await repository.create(imageList2);
      const result = await repository.getAll('123');
      expect(result.length).toEqual(2);
    });
  });
});
