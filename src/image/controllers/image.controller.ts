import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateImageRequestDTO } from '../dtos/createImageRequest.dto';
import {
  UpdatedImageRequestDTO,
  UpdateImageRequestDTO,
} from '../dtos/updatedImageRequest.dto';
import { UpdateImageDTO } from '../dtos/updateImage.dto';
import { CreateImageRequestMapper } from '../mappers/createImageRequestMapper';
import { CreateImageResponseMapper } from '../mappers/createImageResponseMapper';
import { UpdateImageRequestMapper } from '../mappers/updateImageRequestMapper';
import { ImageService } from '../services/image.service';

const MAX_FILE_SIZE_IN_BYTES = 100000000;

@Controller('image')
export class ImageController {
  constructor(private service: ImageService) {}

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
