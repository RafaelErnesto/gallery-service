import { CreateImageResponseDTO } from '../dtos/createImageResponse.dto';
import { Image } from '../entities/image.entity';

export class CreateImageResponseMapper {
  static toCreateImageResponse(image: Image): CreateImageResponseDTO {
    return new CreateImageResponseDTO(image.fileId);
  }
}
