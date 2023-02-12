import { Injectable } from "@nestjs/common";
import { ImageDTO } from "../dtos/image.dto";

@Injectable()
export abstract class ImageRepositoryService {
    abstract save(image: ImageDTO): Promise<null>
}