import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { promises } from 'fs';
import mongoose from 'mongoose';
import { join } from 'path';
import { AppModule } from '../src/app.module';
import { closeInMongodConnection } from '../src/utils/mongodb.utils';

describe('ImageListController (e2e)', () => {
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

  describe('GET image-list', () => {
    it('should return statusCode 400 when image id is not valid', async () => {
      const response = await request(app.getHttpServer()).get(
        '/image-list/test',
      );

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('test is not a valid id');
    });
  });
});
