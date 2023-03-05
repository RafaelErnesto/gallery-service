import { ImageStorageRepositoryService } from './image-storage.repository';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';

export class S3Repository extends ImageStorageRepositoryService {
  constructor(private readonly configService: ConfigService) {
    super();
  }
  async save(image: Express.Multer.File): Promise<string> {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Body: image,
        Key: `${uuid()}-${image.filename}`,
      })
      .promise();
    return uploadResult.Location;
  }
}
