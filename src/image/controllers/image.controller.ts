import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateImageRequestDTO } from "../dtos/createImageRequest.dto";
import { CreateImageRequestMapper } from "../mappers/createImageRequestMapper";
import { CreateImageResponseMapper } from "../mappers/createImageResponseMapper";
import { ImageService } from "../services/image.service";

const MAX_FILE_SIZE_IN_BYTES = 100000000;

@Controller("image")
export class ImageController {
  constructor(private service: ImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor("image"))
  async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE_IN_BYTES }),
          new FileTypeValidator({ fileType: "image/jpeg" }),
        ],
      })
    )
    image: Express.Multer.File,
    @Body() body: CreateImageRequestDTO
  ) {
    let result = await this.service.create(
      CreateImageRequestMapper.toNewImageDto(body, image)
    );
    return CreateImageResponseMapper.toCreateImageResponse(result);
  }
}
