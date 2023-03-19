import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ValidateImageIdPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (!ObjectId.isValid(value)) {
      throw new BadRequestException(`${value} is not a valid id`);
    }
    return value;
  }
}
