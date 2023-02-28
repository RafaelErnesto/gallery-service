import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ImageStatus } from 'src/image/enums/image-status.enum';

export type ImageDocument = HydratedDocument<Image>;

@Schema()
export class Image {
  @Prop()
  id: string;
  @Prop()
  name: string;
  @Prop()
  description?: string;
  @Prop()
  status: ImageStatus;
  @Prop()
  userId: string;
  @Prop()
  listId?: string[];
  @Prop()
  fileId: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
