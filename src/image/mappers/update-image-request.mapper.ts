import { UpdateImageRequestDTO } from '../dtos/update-image-request.dto';
import { UpdateImageDTO } from '../dtos/update-image.dto';

export class UpdateImageRequestMapper {
  static toUpdateImageDto(
    body: UpdateImageRequestDTO,
    id: string,
  ): UpdateImageDTO {
    return Object.assign({} as UpdateImageDTO, { id, ...body });
  }
}
