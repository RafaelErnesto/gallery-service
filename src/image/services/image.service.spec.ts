import { Test, TestingModule } from '@nestjs/testing';
import { NewImageDTO } from '../dtos/newImage.dto';
import { ImageRepositoryService } from '../repositories/ImageRepository.service';
import { ImageRepositoryMock } from '../repositories/ImageRepositoryMock.service';
import { ImageStorageRepositoryService } from '../repositories/ImageStorageRepository.service';
import { ImageStorageRepositoryMock } from '../repositories/ImageStorageRepositoryMock.service';
import { ImageService } from './image.service';
import { Image } from '../entities/image.entity';

describe('ImageService', () => {
  let service: ImageService;
  let imageRepository: ImageRepositoryService;
  let imageStorageRepository: ImageStorageRepositoryService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImageService,
        { provide: ImageRepositoryService, useClass: ImageRepositoryMock },
        {
          provide: ImageStorageRepositoryService,
          useClass: ImageStorageRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<ImageService>(ImageService);
    imageRepository = module.get<ImageRepositoryService>(
      ImageRepositoryService,
    );
    imageStorageRepository = module.get<ImageStorageRepositoryService>(
      ImageStorageRepositoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return imageData when executes without errors', async () => {
    jest
      .spyOn(imageStorageRepository, 'save')
      .mockImplementationOnce(async () => 'imageId');
    jest
      .spyOn(imageRepository, 'save')
      .mockImplementationOnce(async () => null);
    const result = await service.create(new NewImageDTO());

    expect(result.fileId).toBe('imageId');
    expect(imageStorageRepository.save).toHaveBeenCalled();
    expect(imageRepository.save).toHaveBeenCalled();
  });

  it('create should throw when an error happens while saving image into storage', async () => {
    jest
      .spyOn(imageStorageRepository, 'save')
      .mockImplementationOnce(async () => {
        throw new Error('Error saving image');
      });

    try {
      await service.create(new NewImageDTO());
    } catch (error) {
      expect(error.message).toBe('Error saving image');
    }
  });

  it('getImage should return an image url when the imageId is correct', async () => {
    jest.spyOn(imageRepository, 'get').mockImplementationOnce(async () => {
      return Object.assign({} as Image, {
        fileId: 'image url',
        imageId: 'testId',
        status: '',
      });
    });

    const result = await service.getImage('testId');
    expect(result.fileId).toBe('image url');
  });

  it('getImage should throw when image does not exist', async () => {
    jest.spyOn(imageRepository, 'get').mockImplementationOnce(async () => {
      throw new Error('Image does not exist');
    });

    try {
      await service.getImage('testId');
    } catch (e) {
      expect(e.message).toBe('Image does not exist');
    }
  });

  it('getAll should return a list of images when the user have images', async () => {
    jest.spyOn(imageRepository, 'getAll').mockImplementationOnce(async () => {
      return [new Image(), new Image()];
    });

    const result = await service.getAll('userId');
    expect(result.images.length).toEqual(2);
    expect(result.quantity).toEqual(2);
  });
});
