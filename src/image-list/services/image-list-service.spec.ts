import { Test, TestingModule } from '@nestjs/testing';
import { NewImageListDTO } from '../dtos/new-image-list.dto';
import { UpdateImageListDTO } from '../dtos/update-image-list.dto';
import { ImageList } from '../entities/image-list';
import { ImageListStatus } from '../entities/image-list-status.enum';
import { ImageListRepositoryMock } from '../repositories/image-list-mock.repository';
import { ImageListRepository } from '../repositories/image-list.repository';
import { ImageListService } from './image-list-service';

describe('ImageListService', () => {
  let service: ImageListService;
  let repository: ImageListRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ImageListService, useClass: ImageListService },
        { provide: ImageListRepository, useClass: ImageListRepositoryMock },
      ],
    }).compile();

    service = module.get<ImageListService>(ImageListService);
    repository = module.get<ImageListRepository>(ImageListRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should throw when an existing list with the same name already exists', async () => {
    jest.spyOn(repository, 'getByName').mockImplementationOnce(async () => {
      return new ImageList('Dummy list', 'userId', ImageListStatus.ACTIVE);
    });

    try {
      await service.create(new NewImageListDTO('Dummy list', 'userId'));
    } catch (e) {
      expect(e.message).toBe('List already exists');
    }
  });

  it('create should return ImageListDTO when creating is ok', async () => {
    jest.spyOn(repository, 'getByName').mockImplementationOnce(async () => {
      return null;
    });

    jest.spyOn(repository, 'create').mockImplementationOnce(async () => {
      return new ImageList('Dummy', 'userId', ImageListStatus.ACTIVE, 'id');
    });

    const result = await service.create(new NewImageListDTO('Dummy', 'userId'));
    expect(result.name).toBe('Dummy');
  });

  it('update should throw when list was not found', async () => {
    jest.spyOn(repository, 'get').mockImplementationOnce(async () => {
      return null;
    });

    try {
      await service.update(new UpdateImageListDTO('Dummy list', 'userId'));
    } catch (e) {
      expect(e.message).toBe('The list was not found');
    }
  });

  it('update should return ImageListDTO when updating is ok', async () => {
    jest.spyOn(repository, 'get').mockImplementationOnce(async () => {
      return new ImageList('Dummy list', 'userId', ImageListStatus.ACTIVE);
    });

    jest.spyOn(repository, 'update').mockImplementationOnce(async () => {
      return new ImageList('Dummy', 'userId', ImageListStatus.ACTIVE, 'id');
    });

    const result = await service.update(
      new UpdateImageListDTO('Dummy', 'userId'),
    );
    expect(result.name).toBe('Dummy');
  });

  it('get should throw when an list was not found', async () => {
    jest.spyOn(repository, 'get').mockImplementationOnce(async () => {
      return null;
    });

    try {
      await service.get('id');
    } catch (e) {
      expect(e.message).toBe('The list was not found');
    }
  });

  it('get should return ImageListDTO when list was found', async () => {
    const entity = new ImageList(
      'Dummy',
      'userId',
      ImageListStatus.ACTIVE,
      'id',
    );
    jest.spyOn(repository, 'get').mockImplementationOnce(async () => {
      return entity;
    });

    const result = await service.get(entity.id);
    expect(result).toBeDefined();
    expect(result.id).toBe('id');
  });

  it('getAll should return empty lists when no lists where found', async () => {
    jest.spyOn(repository, 'getAll').mockImplementationOnce(async () => {
      return [];
    });

    const result = await service.getAll('userId');
    expect(result.count).toEqual(0);
    expect(result.lists.length).toBe(0);
    expect(result.total).toBe(0);
  });

  it('getAll should return lists when there are lists', async () => {
    jest.spyOn(repository, 'getAll').mockImplementationOnce(async () => {
      return [
        new ImageList('Dummy 1', 'userId', ImageListStatus.ACTIVE),
        new ImageList('Dummy 2', 'userId', ImageListStatus.ACTIVE),
      ];
    });

    const result = await service.getAll('userId');
    expect(result.count).toEqual(2);
    expect(result.lists.length).toBe(2);
    expect(result.total).toBe(0);
  });
});
