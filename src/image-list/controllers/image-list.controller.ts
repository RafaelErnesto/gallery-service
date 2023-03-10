import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GetAllImageListDTO } from '../dtos/get-all-image-list.dto';
import { ImageListDTO } from '../dtos/image-list.dto';
import { NewImageListDTO } from '../dtos/new-image-list.dto';
import { UpdateImageListRequestDTO } from '../dtos/update-image-list-request.dto';
import { UpdateImageListDTO } from '../dtos/update-image-list.dto';
import { ImageListService } from '../services/image-list-service';

@Controller('image-list')
export class ImageListController {
  constructor(private service: ImageListService) {
    this.service = service;
  }

  @Get(':id')
  @Header('Content-type', 'application/json')
  async get(@Param('id') id: string): Promise<ImageListDTO> {
    return await this.service.get(id);
  }

  @Get('all/:userId')
  @Header('Content-type', 'application/json')
  async getAll(@Param('userId') userId: string): Promise<GetAllImageListDTO> {
    return await this.service.getAll(userId);
  }

  @Post()
  @Header('Content-type', 'application/json')
  async create(@Body() body: NewImageListDTO): Promise<ImageListDTO> {
    return await this.service.create(body);
  }

  @Put(':id')
  @Header('Content-type', 'application/json')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateImageListRequestDTO,
  ): Promise<ImageListDTO> {
    const requestPayload = Object.assign({} as UpdateImageListDTO, {
      id: id,
      ...body,
    });
    return await this.service.update(requestPayload);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
