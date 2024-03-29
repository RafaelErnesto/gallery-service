import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { promises } from 'fs';
import mongoose from 'mongoose';
import { join } from 'path';
import { AppModule } from '../src/app.module';
import { closeInMongodConnection } from '../src/utils/mongodb.utils';

describe('ImageController (e2e)', () => {
  let app: INestApplication;
  let mockedImage;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        skipNullProperties: true,
      }),
    );
    await app.init();
    mockedImage = await promises.readFile(
      join(__dirname, './image-mock/mock.png'),
    );
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
        .send({ name: 'Teste' });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('File is required');
    });
    it('should return statusCode 400 when name is empty', async () => {
      const response = await request(app.getHttpServer())
        .post('/image/')
        .field('name', '')
        .attach('image', mockedImage, 'mock.jpg');

      expect(response.statusCode).toBe(400);
      expect(
        response.body.message.includes('name should not be empty'),
      ).toBeTruthy();
    });
    it('should return statusCode 400 when name is smaller than 5 characters', async () => {
      const response = await request(app.getHttpServer())
        .post('/image/')
        .field('name', '1234')
        .attach('image', mockedImage, 'mock.jpg');
      expect(response.statusCode).toBe(400);
    });
    it('should return statusCode 400 when name contains non-alphanumeric characters', async () => {
      const response = await request(app.getHttpServer())
        .post('/image/')
        .field('name', '123%4')
        .attach('image', mockedImage, 'mock.jpg');
      expect(response.statusCode).toBe(400);
      expect(
        response.body.message.includes(
          'name must contain only letters and numbers',
        ),
      ).toBeTruthy();
    });
  });

  describe('UPDATE image', () => {
    it('should return statusCode 400 when name is empty', async () => {
      const response = await request(app.getHttpServer())
        .put('/image/6424d89b940020d2af3e4117')
        .send({ name: '' });
      expect(response.statusCode).toBe(400);
      expect(
        response.body.message.includes('name should not be empty'),
      ).toBeTruthy();
      expect(
        response.body.message.includes('status should not be empty'),
      ).toBeFalsy();
    });
    it('should return statusCode 400 when name is invalid', async () => {
      const response = await request(app.getHttpServer())
        .put('/image/6424d89b940020d2af3e4117')
        .send({ name: 'a%' });
      expect(response.statusCode).toBe(400);
      expect(
        response.body.message.includes(
          'name must contain only letters and numbers',
        ),
      ).toBeTruthy();
      expect(
        response.body.message.includes('status should not be empty'),
      ).toBeFalsy();
      expect(
        response.body.message.includes('description should not be empty'),
      ).toBeFalsy();
    });
    it('should return statusCode 400 when description is invalid', async () => {
      const response = await request(app.getHttpServer())
        .put('/image/6424d89b940020d2af3e4117')
        .send({ description: 'a%' });
      expect(response.statusCode).toBe(400);
      expect(
        response.body.message.includes(
          'description must contain only letters and numbers',
        ),
      ).toBeTruthy();
      expect(
        response.body.message.includes('name should not be empty'),
      ).toBeFalsy();
      expect(
        response.body.message.includes('name should not be empty'),
      ).toBeFalsy();
    });
  });
  describe('DELETE image', () => {
    it('should return statusCode 400 when id is invalid', async () => {
      const response = await request(app.getHttpServer()).delete('/image/test');

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('test is not a valid id');
    });
  });
});
