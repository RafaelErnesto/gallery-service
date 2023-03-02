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
});
