import { Test, TestingModule } from '@nestjs/testing';
import { ImageRepositoryService } from '../repositories/ImageRepository.service';
import { ImageRepositoryMock } from '../repositories/ImageRepositoryMock.service';
import { ImageStorageRepositoryService } from '../repositories/ImageStorageRepository.service';
import { ImageStorageRepositoryMock } from '../repositories/ImageStorageRepositoryMock.service';
import { ImageService } from './image.service';

describe('ImageService', () => {
  let service: ImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageService,
        { provide: ImageRepositoryService , useClass: ImageRepositoryMock},
        { provide: ImageStorageRepositoryService , useClass: ImageStorageRepositoryMock },
      ],
    }).compile();

    service = module.get<ImageService>(ImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
