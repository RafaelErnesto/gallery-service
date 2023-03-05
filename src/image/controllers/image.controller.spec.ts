import { Test, TestingModule } from '@nestjs/testing';
import { ImageService } from '../services/image.service';
import { ImageController } from './image.controller';
import { ImageRepositoryService } from '../repositories/image.repository';
import { ImageStorageRepositoryService } from '../repositories/image-storage.repository';
import { ImageRepositoryMock } from '../repositories/mocks/image-repository-mock.repository';
import { ImageStorageRepositoryMock } from '../repositories/mocks/image-storage-repository-mock.repository';
import { GetAllImageDTO } from '../dtos/get-all-images.dto';
import { Image } from '../entities/image.entity';
import { CreateImageRequestDTO } from '../dtos/create-image-request.dto';
import { ImageDTO } from '../dtos/image.dto';
import { UpdateImageRequestDTO } from '../dtos/update-image-request.dto';

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
    it('should call service.getImage with id as parameter', async () => {
      jest
        .spyOn(service, 'getImage')
        .mockImplementationOnce((): Promise<ImageDTO> => {
          return Object.assign({} as ImageDTO);
        });

      const id = 'testId';
      await controller.get(id);
      expect(service.getImage).toHaveBeenCalledTimes(1);
      expect(service.getImage).toHaveBeenCalledWith(id);
    });
  });

  describe('ImageController.getAll', () => {
    it('should call service.getAll with userId as parameter', async () => {
      jest
        .spyOn(service, 'getAll')
        .mockImplementationOnce((): Promise<GetAllImageDTO> => {
          return Object.assign({} as GetAllImageDTO);
        });

      const userId = 'testId';
      await controller.getAll(userId);
      expect(service.getAll).toHaveBeenCalledTimes(1);
      expect(service.getAll).toHaveBeenCalledWith(userId);
    });
  });

  describe('ImageController.create', () => {
    it('should call service.create with NewImageDTO as parameter', async () => {
      jest
        .spyOn(service, 'create')
        .mockImplementationOnce((): Promise<Image> => {
          return Object.assign({} as Image);
        });

      const file = Object.assign({} as Express.Multer.File);
      const body = Object.assign({} as CreateImageRequestDTO);
      await controller.create(file, body);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('ImageController.update', () => {
    it('should call service.update with one time', async () => {
      jest
        .spyOn(service, 'update')
        .mockImplementationOnce((): Promise<Image> => {
          return Object.assign({} as Image);
        });

      const id = 'testId';
      const body = Object.assign({} as UpdateImageRequestDTO);
      await controller.update(id, body);
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('ImageController.delete', () => {
    it('should call service.delete with one time', async () => {
      jest
        .spyOn(service, 'delete')
        .mockImplementationOnce((): Promise<null> => {
          return null;
        });

      const id = 'testId';
      await controller.delete(id);
      expect(service.delete).toHaveBeenCalledTimes(1);
    });
  });
});
