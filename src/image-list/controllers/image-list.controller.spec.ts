import { Test, TestingModule } from '@nestjs/testing';
import { ImageListController } from './image-list.controller';

describe('ImageListController', () => {
  let controller: ImageListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageListController],
    }).compile();

    controller = module.get<ImageListController>(ImageListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
