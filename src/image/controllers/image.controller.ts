import { Body, Controller, Post } from '@nestjs/common';
import { CreateImageDTO } from '../dtos/createImage.dto';

@Controller('image')
export class ImageController {
  @Post()
  async create(@Body() createImageBody: CreateImageDTO) {}
}
