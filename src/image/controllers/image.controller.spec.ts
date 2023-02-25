import { Test, TestingModule } from '@nestjs/testing';
import { ImageService } from '../services/image.service';
import { ImageController } from './image.controller';
import { ImageRepositoryService } from '../repositories/image.repository';
import { ImageStorageRepositoryService } from '../repositories/image-storage.repository';
import { ImageRepositoryMock } from '../repositories/image-repository-mock.repository';
import { ImageStorageRepositoryMock } from '../repositories/image-storage-repository-mock.repository';

describe('ImageController', () => {
  let controller: ImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageController],
      providers: [
        ImageService,
        { provide: ImageRepositoryService, useClass: ImageRepositoryMock },
        {
          provide: ImageStorageRepositoryService,
          useClass: ImageStorageRepositoryMock,
        },
      ],
    }).compile();

    controller = module.get<ImageController>(ImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
