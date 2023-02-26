import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateImageRequestDTO } from '../dtos/create-image-request.dto';
import { UpdateImageRequestDTO } from '../dtos/update-image-request.dto';
import { CreateImageRequestMapper } from '../mappers/create-image-request.mapper';
import { CreateImageResponseMapper } from '../mappers/create-image-response.mapper';
import { UpdateImageRequestMapper } from '../mappers/update-image-request.mapper';
import { ImageService } from '../services/image.service';

const MAX_FILE_SIZE_IN_BYTES = 100000000;

@Controller('image')
export class ImageController {
  constructor(private service: ImageService) {}

  @Get(':id')
  async get(@Param('id') id: string) {
    const result = await this.service.getImage(id);
    return result;
  }

  @Get('/all/:userId')
  async getAll(@Param('userId') userId: string) {
    const result = await this.service.getAll(userId);
    return result;
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE_IN_BYTES }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    image: Express.Multer.File,
    @Body() body: CreateImageRequestDTO,
  ) {
    const result = await this.service.create(
      CreateImageRequestMapper.toNewImageDto(body, image),
    );
    return CreateImageResponseMapper.toCreateImageResponse(result);
  }

  @Put(':id')
  async updated(@Param('id') id: string, @Body() body: UpdateImageRequestDTO) {
    const result = await this.service.update(
      UpdateImageRequestMapper.toUpdateImageDto(body, id),
    );
    return result;
  }
}
