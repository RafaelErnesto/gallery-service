export class NewImageListDTO {
  name: string;
  userId: string;
  description?: string;

  constructor(name: string, userId: string, description?: string) {
    this.name = name;
    this.userId = userId;
    this.description = description;
  }
}
