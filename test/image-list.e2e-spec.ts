import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { closeInMongodConnection } from '../src/utils/mongodb.utils';

describe('ImageListController (e2e)', () => {
  let app: INestApplication;

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
  });

  afterAll(async () => {
    await closeInMongodConnection();
    await app.close();
  });

  describe('GET image-list', () => {
    it('should return statusCode 400 when image-list id is not valid', async () => {
      const response = await request(app.getHttpServer()).get(
        '/image-list/test',
      );

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('test is not a valid id');
    });
  });

  describe('GET image-list/all', () => {
    it('should return statusCode 400 when user id is not valid', async () => {
      const response = await request(app.getHttpServer()).get(
        '/image-list/all/dummy',
      );

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('dummy is not a valid user id');
    });
  });

  describe('POST image-list', () => {
    it('should return statusCode 400 when name is not valid', async () => {
      const response = await request(app.getHttpServer())
        .post('/image-list')
        .send({ name: 't%', userId: '31dd1a71-91b9-478a-b65b-b52dca276aa2' });

      expect(response.statusCode).toBe(400);
      expect(
        response.body.message.includes(
          'name must contain only letters and numbers',
        ),
      ).toBeTruthy();
    });
  });
});
