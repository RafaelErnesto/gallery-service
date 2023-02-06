import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateImageDTO } from '../dtos/createImage.dto';

@Controller('image')
export class ImageController {
  @Post()
  async create(@Body(new ValidationPipe()) createImageBody: CreateImageDTO) {}
}
