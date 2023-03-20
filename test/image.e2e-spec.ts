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
    await app.close();
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
  describe('GET image/all', () => {
    it('should return statusCode 400 when user id is not valid', async () => {
      const response = await request(app.getHttpServer()).get(
        '/image/all/test',
      );

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('test is not a valid user id');
    });
    it('should return statusCode 200 and empty array when there is not data for the user', async () => {
      const response = await request(app.getHttpServer()).get(
        `/image/all/18d87054-59a5-40d6-868c-ca805ff6f9b8`,
      );

      expect(response.statusCode).toBe(200);
      expect(response.body.images.length).toBe(0);
    });
  });
  describe('POST image', () => {
    it('should return statusCode 400 when file is empty', async () => {
      const response = await request(app.getHttpServer())
        .post('/image/')
        .send({});

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('File is required');
    });
    it('should return statusCode 400 when name is empty', async () => {
      const buffer = Buffer.from('TEST');
      const response = await request(app.getHttpServer())
        .post('/image/')
        .field('name', '')
        .attach('file', buffer, 'test-file.txt');

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('test is not a valid user id');
    });
  });
});
