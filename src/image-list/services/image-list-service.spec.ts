import { Test, TestingModule } from '@nestjs/testing';
import { ImageListService } from './image-list-service';

describe('ImageListService', () => {
  let provider: ImageListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageListService],
    }).compile();

    provider = module.get<ImageListService>(ImageListService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
