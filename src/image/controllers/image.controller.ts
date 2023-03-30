import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import { CreateImageRequestDTO } from '../dtos/create-image-request.dto';
import { UpdateImageRequestDTO } from '../dtos/update-image-request.dto';
import { CreateImageRequestMapper } from '../mappers/create-image-request.mapper';
import { CreateImageResponseMapper } from '../mappers/create-image-response.mapper';
import { UpdateImageRequestMapper } from '../mappers/update-image-request.mapper';
import { ValidateImageIdPipe } from '../pipes/validate-image-id.pipe';
import { ValidateUserIdPipe } from '../pipes/validate-user-id.pipe';
import { ImageService } from '../services/image.service';

const MAX_FILE_SIZE_IN_BYTES = 100000000;

@UseFilters(new HttpExceptionFilter())
@Controller('image')
export class ImageController {
  constructor(private service: ImageService) {}

  @Get(':id')
  async get(
    @Param('id', ValidateImageIdPipe)
    id: string,
  ) {
    const result = await this.service.getImage(id);
    return result;
  }

  @Get('/all/:userId')
  async getAll(@Param('userId', ValidateUserIdPipe) userId: string) {
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
  async update(
    @Param('id', ValidateImageIdPipe) id: string,
    @Body() body: UpdateImageRequestDTO,
  ) {
    const result = await this.service.update(
      UpdateImageRequestMapper.toUpdateImageDto(body, id),
    );
    return result;
  }

  @Delete(':id')
  async delete(@Param('id', ValidateImageIdPipe) id: string) {
    await this.service.delete(id);
  }
}
