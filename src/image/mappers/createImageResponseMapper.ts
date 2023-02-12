import { CreateImageResponseDTO } from "../dtos/createImageResponse.dto";
import { ImageDTO } from "../dtos/image.dto";

export class CreateImageResponseMapper{
    static toCreateImageResponse(imageData: ImageDTO): CreateImageResponseDTO {
        return new CreateImageResponseDTO(imageData.fileId)
    }
}