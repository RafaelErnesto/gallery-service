import { Test, TestingModule } from '@nestjs/testing';
import { ImageListDTO } from '../dtos/image-list.dto';
import { ImageListRepositoryMock } from '../repositories/image-list-mock.repository';
import { ImageListRepository } from '../repositories/image-list.repository';
import { ImageListService } from '../services/image-list-service';
import { ImageListController } from './image-list.controller';

describe('ImageListController', () => {
  let controller: ImageListController;
  let service: ImageListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageListController],
      providers: [
        ImageListService,
        { provide: ImageListRepository, useClass: ImageListRepositoryMock },
      ],
    }).compile();

    controller = module.get<ImageListController>(ImageListController);
    service = module.get<ImageListService>(ImageListService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('ImageListController.get', () => {
    it('should call service.get once with id parameter', async () => {
      jest
        .spyOn(service, 'get')
        .mockImplementationOnce((): Promise<ImageListDTO> => {
          return null;
        });
      const id = 'testId';
      await controller.get(id);
      expect(service.get).toHaveBeenCalledTimes(1);
      expect(service.get).toHaveBeenCalledWith(id);
    });
  });
});
