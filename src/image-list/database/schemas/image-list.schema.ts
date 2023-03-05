import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ImageListStatus } from 'src/image-list/entities/image-list-status.enum';

export type ImageListDocument = HydratedDocument<ImageList>;

@Schema()
export class ImageList {
  @Prop()
  name: string;
  @Prop()
  userId: string;
  @Prop()
  status: ImageListStatus;
  @Prop()
  id?: string;
  @Prop()
  description?: string;
}

export const ImageListSchema = SchemaFactory.createForClass(ImageList);
