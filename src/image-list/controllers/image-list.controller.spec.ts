import { Test, TestingModule } from '@nestjs/testing';
import { GetAllImageListDTO } from '../dtos/get-all-image-list.dto';
import { ImageListDTO } from '../dtos/image-list.dto';
import { NewImageListDTO } from '../dtos/new-image-list.dto';
import { UpdateImageListRequestDTO } from '../dtos/update-image-list-request.dto';
import { UpdateImageListDTO } from '../dtos/update-image-list.dto';
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
          return Object.assign({} as ImageListDTO);
        });
      const id = 'testId';
      await controller.get(id);
      expect(service.get).toHaveBeenCalledTimes(1);
      expect(service.get).toHaveBeenCalledWith(id);
    });
  });

  describe('ImageListController.getAll', () => {
    it('should call service.getAll once with userId parameter', async () => {
      jest
        .spyOn(service, 'getAll')
        .mockImplementationOnce((): Promise<GetAllImageListDTO> => {
          return Object.assign({} as GetAllImageListDTO);
        });
      const userId = 'userId';
      await controller.getAll(userId);
      expect(service.getAll).toHaveBeenCalledTimes(1);
      expect(service.getAll).toHaveBeenCalledWith(userId);
    });
  });

  describe('ImageListController.create', () => {
    it('should call service.create once with NewImageListDTO parameter', async () => {
      jest
        .spyOn(service, 'create')
        .mockImplementationOnce((): Promise<ImageListDTO> => {
          return Object.assign({} as ImageListDTO);
        });
      const payload = Object.assign({} as NewImageListDTO);
      await controller.create(payload);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(payload);
    });
  });

  describe('ImageListController.update', () => {
    it('should call service.update once with UpdateImageListDTO parameter', async () => {
      jest
        .spyOn(service, 'update')
        .mockImplementationOnce((): Promise<ImageListDTO> => {
          return Object.assign({} as ImageListDTO);
        });
      const id = 'testId';
      const body = Object.assign({} as UpdateImageListRequestDTO);
      const payload = Object.assign({ id, ...body } as UpdateImageListDTO);
      await controller.update(id, body);
      expect(service.update).toHaveBeenCalledTimes(1);
      expect(service.update).toHaveBeenCalledWith(payload);
    });
  });

  describe('ImageListController.delete', () => {
    it('should call service.delete once with id parameter', async () => {
      jest
        .spyOn(service, 'delete')
        .mockImplementationOnce((): Promise<null> => {
          return null;
        });
      const id = 'testId';
      await controller.delete(id);
      expect(service.delete).toHaveBeenCalledTimes(1);
      expect(service.delete).toHaveBeenCalledWith(id);
    });
  });
});
