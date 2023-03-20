import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from '../src/utils/in-memory-mongodb/in-memory-mongodb.utils';
import { ImageModule } from '../src/image/image.module';
import mongoose from 'mongoose';

describe('ImageController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), ImageModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  describe('GET image', () => {
    it('should return statusCode 400 when image id is not valid', async () => {
      const response = await request(app.getHttpServer()).get('/image/test');

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('test is not a valid id');
    });
    it('should return statusCode 404 when image was not found', async () => {
      const mockedId = new mongoose.Types.ObjectId();
      const response = await request(app.getHttpServer()).get(
        `/image/${mockedId.toString()}`,
      );

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Image not found');
    });
  });
});
