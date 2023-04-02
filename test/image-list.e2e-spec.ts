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
    it('should return statusCode 400 when name has not valid characters', async () => {
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
    it('should return statusCode 400 when name is not a string', async () => {
      const response = await request(app.getHttpServer())
        .post('/image-list')
        .send({ name: 1, userId: '31dd1a71-91b9-478a-b65b-b52dca276aa2' });

      expect(response.statusCode).toBe(400);
      expect(
        response.body.message.includes('name must be a string'),
      ).toBeTruthy();
    });
    it('should return statusCode 400 when name is empty', async () => {
      const response = await request(app.getHttpServer())
        .post('/image-list')
        .send({ name: '', userId: '31dd1a71-91b9-478a-b65b-b52dca276aa2' });

      expect(response.statusCode).toBe(400);
      expect(
        response.body.message.includes('name should not be empty'),
      ).toBeTruthy();
    });
    it('should return statusCode 400 when userId is not valid', async () => {
      const response = await request(app.getHttpServer())
        .post('/image-list')
        .send({ name: 'testeuser', userId: '' });

      expect(response.statusCode).toBe(400);
      expect(
        response.body.message.includes('userId should not be empty'),
      ).toBeTruthy();
      expect(
        response.body.message.includes('userId must be a UUID'),
      ).toBeTruthy();
    });
    it('should return statusCode 400 when description is not a string', async () => {
      const response = await request(app.getHttpServer())
        .post('/image-list')
        .send({
          name: 'testeuser',
          userId: '31dd1a71-91b9-478a-b65b-b52dca276aa2',
          description: 3,
        });

      expect(response.statusCode).toBe(400);
      expect(
        response.body.message.includes('description must be a string'),
      ).toBeTruthy();
    });
    it('should return statusCode 400 when description is a empty string', async () => {
      const response = await request(app.getHttpServer())
        .post('/image-list')
        .send({
          name: 'testeuser',
          userId: '31dd1a71-91b9-478a-b65b-b52dca276aa2',
          description: '',
        });

      expect(response.statusCode).toBe(400);
      expect(
        response.body.message.includes('description should not be empty'),
      ).toBeTruthy();
    });
    it('should return statusCode 400 when description has invalid characters', async () => {
      const response = await request(app.getHttpServer())
        .post('/image-list')
        .send({
          name: 'testeuser',
          userId: '31dd1a71-91b9-478a-b65b-b52dca276aa2',
          description: '%',
        });

      expect(response.statusCode).toBe(400);
      expect(
        response.body.message.includes(
          'description must contain only letters and numbers',
        ),
      ).toBeTruthy();
    });
  });
  describe('PUT image-list', () => {
    it('should return statusCode 400 when image-list id is not valid', async () => {
      const response = await request(app.getHttpServer())
        .put('/image-list/invalid-id')
        .send({ name: 'updatedlist' });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('invalid-id is not a valid id');
    });

    it('should return statusCode 400 when name has invalid characters', async () => {
      const response = await request(app.getHttpServer())
        .put('/image-list/6429db33c30d77a0ee526d8e')
        .send({ name: '%%' });

      expect(response.statusCode).toBe(400);
      expect(
        response.body.message.includes(
          'name must contain only letters and numbers',
        ),
      ).toBeTruthy();
    });

    it('should return statusCode 400 when name is not a string', async () => {
      const response = await request(app.getHttpServer())
        .put('/image-list/6429db33c30d77a0ee526d8e')
        .send({ name: 2 });

      expect(response.statusCode).toBe(400);
      expect(
        response.body.message.includes('name must be a string'),
      ).toBeTruthy();
    });

    it('should return statusCode 400 when name is a empty string', async () => {
      const response = await request(app.getHttpServer())
        .put('/image-list/6429db33c30d77a0ee526d8e')
        .send({ name: '' });

      expect(response.statusCode).toBe(400);
      expect(
        response.body.message.includes('name should not be empty'),
      ).toBeTruthy();
    });

    it('should return statusCode 400 when description is not a string', async () => {
      const response = await request(app.getHttpServer())
        .put('/image-list/6429db33c30d77a0ee526d8e')
        .send({ description: 34 });

      expect(response.statusCode).toBe(400);
      expect(
        response.body.message.includes('description must be a string'),
      ).toBeTruthy();
    });
    it('should return statusCode 400 when description is a empty string', async () => {
      const response = await request(app.getHttpServer())
        .put('/image-list/6429db33c30d77a0ee526d8e')
        .send({ description: '' });

      expect(response.statusCode).toBe(400);
      expect(
        response.body.message.includes('description should not be empty'),
      ).toBeTruthy();
    });
    it('should return statusCode 400 when description has invalid characters', async () => {
      const response = await request(app.getHttpServer())
        .put('/image-list/6429db33c30d77a0ee526d8e')
        .send({ description: '%' });

      expect(response.statusCode).toBe(400);
      expect(
        response.body.message.includes(
          'description must contain only letters and numbers',
        ),
      ).toBeTruthy();
    });
  });
});
