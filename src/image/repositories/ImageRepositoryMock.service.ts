import { ImageDTO } from "../dtos/image.dto";
import { ImageRepositoryService } from "./ImageRepository.service";

export class ImageRepositoryMock extends ImageRepositoryService {
    save(image: ImageDTO): Promise<null> {
       return null
    }
    
}