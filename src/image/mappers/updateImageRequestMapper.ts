import { UpdateImageRequestDTO } from '../dtos/updatedImageRequest.dto';
import { UpdateImageDTO } from '../dtos/updateImage.dto';

export class UpdateImageRequestMapper {
  static toUpdateImageDto(
    body: UpdateImageRequestDTO,
    id: string,
  ): UpdateImageDTO {
    return Object.assign({} as UpdateImageDTO, { id, ...body });
  }
}
