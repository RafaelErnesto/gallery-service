import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ImageModule } from '../src/image/image.module';

describe('ImageController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ImageModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('image/ (GET)', () => {
    return request(app.getHttpServer())
      .get('image/')
      .expect(200)
      .expect('Hello World!');
  });
});
