import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../utils/in-memory-mongodb/in-memory-mongodb.utils';
import { ImageSchema } from '../database/schemas/image.schema';
import { MongoDbImageRepository } from './mongodb-image.repository';
import { Image } from '../entities/image.entity';
import { ImageStatus } from '../enums/image-status.enum';
import mongoose from 'mongoose';

describe('MongoDbImageRepository', () => {
  let repository: MongoDbImageRepository;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]),
      ],
      providers: [MongoDbImageRepository],
    }).compile();
    repository = module.get<MongoDbImageRepository>(MongoDbImageRepository);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  describe('create should', () => {
    it('create Image and return the Image entity when Image creation is ok', async () => {
      const imageToBeSaved = Object.assign({} as Image, {
        name: 'Dummy',
        status: ImageStatus.ACTIVE,
        userId: 'userTestId',
        fileId: 'testFileId',
      });
      const savedImage = await repository.save(imageToBeSaved);
      expect(savedImage.name).toBe(imageToBeSaved.name);
      expect(savedImage.id).toBeDefined();
    });
  });
  describe('get should', () => {
    it('return null when the image does not exist', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const imageFound = await repository.get(fakeId.toString());
      expect(imageFound).toBeNull();
    });
    it('return image when the image exist', async () => {
      const image = Object.assign({} as Image, {
        name: 'Dummy',
        status: ImageStatus.ACTIVE,
        userId: 'userTestId',
        fileId: 'testFileId',
      });
      const insertedImage = await repository.save(image);
      const imageFound = await repository.get(insertedImage.id);
      expect(imageFound.id).toEqual(insertedImage.id);
    });
  });
  describe('getAll should', () => {
    it('return empty when there is no image', async () => {
      const result = await repository.getAll('dummy');
      expect(result.length).toBe(0);
    });
    it('return image when the image exist', async () => {
      const image1 = Object.assign({} as Image, {
        name: 'Dummy1',
        status: ImageStatus.ACTIVE,
        userId: '123',
        fileId: 'testFileId',
      });
      const image2 = Object.assign({} as Image, {
        name: 'Dummy2',
        status: ImageStatus.ACTIVE,
        userId: '123',
        fileId: 'testFileId',
      });
      await repository.save(image1);
      await repository.save(image2);
      const result = await repository.getAll('123');
      expect(result.length).toEqual(2);
    });
  });
});
