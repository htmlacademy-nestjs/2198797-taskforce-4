import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';


@Injectable()
export class FileValidationPipe implements PipeTransform {

  constructor(private maxSize: number, private message: string) {
    this.maxSize = maxSize;
    this.message = message;
  }

  async transform(value: Express.Multer.File) {
    if (value.size > this.maxSize) {
      throw new BadRequestException(this.message);
    }
    return value;
  }
}