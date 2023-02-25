import { CreateImageRequestDTO } from '../dtos/create-image-request.dto';
import { NewImageDTO } from '../dtos/new-image.dto';

export class CreateImageRequestMapper {
  static toNewImageDto(
    body: CreateImageRequestDTO,
    image: Express.Multer.File,
  ): NewImageDTO {
    const newImageDto = Object.assign({}, body) as NewImageDTO;
    newImageDto.file = image;
    return newImageDto;
  }
}
