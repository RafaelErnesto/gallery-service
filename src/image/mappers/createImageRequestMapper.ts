import { CreateImageRequestDTO } from '../dtos/createImageRequest.dto';
import { NewImageDTO } from '../dtos/newImage.dto';

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
