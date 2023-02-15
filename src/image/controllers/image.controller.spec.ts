import { Test, TestingModule } from '@nestjs/testing';
import { ImageService } from '../services/image.service';
import { ImageController } from './image.controller';
import { ImageRepositoryService } from '../repositories/ImageRepository.service';
import { ImageStorageRepositoryService } from '../repositories/ImageStorageRepository.service';
import { ImageRepositoryMock } from '../repositories/ImageRepositoryMock.service';
import { ImageStorageRepositoryMock } from '../repositories/ImageStorageRepositoryMock.service';

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
