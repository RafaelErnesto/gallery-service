import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateImageDTO } from "../dtos/createImage.dto";
const MAX_FILE_SIZE_IN_BYTES = 100000000;
@Controller("image")
export class ImageController {
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE_IN_BYTES }),
          new FileTypeValidator({ fileType: "image/jpeg" }),
        ],
      })
    )
    image: Express.Multer.File,
    @Body() body: CreateImageDTO
  ) {
    console.log(image);
    console.log(body)
  }
}
