import { Test, TestingModule } from '@nestjs/testing';
import { ImageService } from '../services/image.service';
import { ImageController } from './image.controller';
import { ImageRepositoryService } from '../repositories/image.repository';
import { ImageStorageRepositoryService } from '../repositories/image-storage.repository';
import { ImageRepositoryMock } from '../repositories/image-repository-mock.repository';
import { ImageStorageRepositoryMock } from '../repositories/image-storage-repository-mock.repository';
import { GetImageDTO } from '../dtos/get-image.dto';

describe('ImageController', () => {
  let controller: ImageController;
  let service: ImageService;

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
    service = module.get<ImageService>(ImageService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('ImageController.get', () => {
    it('should call service.get with id as parameter', async () => {
      jest
        .spyOn(service, 'getImage')
        .mockImplementationOnce((): Promise<GetImageDTO> => {
          return Object.assign({} as GetImageDTO);
        });

      const id = 'testId';
      await controller.get(id);
      expect(service.getImage).toHaveBeenCalledTimes(1);
      expect(service.getImage).toHaveBeenCalledWith(id);
    });
  });
});
