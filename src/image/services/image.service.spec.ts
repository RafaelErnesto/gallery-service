import { Test, TestingModule } from "@nestjs/testing";
import { NewImageDTO } from "../dtos/newImage.dto";
import { ImageRepositoryService } from "../repositories/ImageRepository.service";
import { ImageRepositoryMock } from "../repositories/ImageRepositoryMock.service";
import { ImageStorageRepositoryService } from "../repositories/ImageStorageRepository.service";
import { ImageStorageRepositoryMock } from "../repositories/ImageStorageRepositoryMock.service";
import { ImageService } from "./image.service";

describe("ImageService", () => {
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
      ImageRepositoryService
    );
    imageStorageRepository = module.get<ImageStorageRepositoryService>(
      ImageStorageRepositoryService
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return imageData when ok", async () => {
    jest
      .spyOn(imageStorageRepository, "save")
      .mockImplementationOnce(async () => "imageId");
    jest
      .spyOn(imageRepository, "save")
      .mockImplementationOnce(async () => null);
    let result = await service.create(new NewImageDTO());

    expect(result.fileId).toBe("imageId");
    expect(imageStorageRepository.save).toHaveBeenCalled()
    expect(imageRepository.save).toHaveBeenCalled()
  });

  it("should throw when an error happens while saving image into storage", async () => {
    jest
      .spyOn(imageStorageRepository, "save")
      .mockImplementationOnce( async () => { throw new Error("Error saving image") });
    
      try {
        await service.create(new NewImageDTO())
      } catch(error) {
        expect(error.message).toBe("Error saving image")
      }
  });
});
