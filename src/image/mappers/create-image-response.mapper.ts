import { CreateImageResponseDTO } from '../dtos/create-image-response.dto';
import { Image } from '../entities/image.entity';

export class CreateImageResponseMapper {
  static toCreateImageResponse(image: Image): CreateImageResponseDTO {
    return new CreateImageResponseDTO(image.fileId);
  }
}
