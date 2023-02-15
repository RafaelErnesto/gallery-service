export class NewImageDTO {
  name: string;
  description?: string;
  status?: string;
  listId?: string;
  file: Express.Multer.File;
}
