import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Task } from '@project/shared/app-types';

const MAX_TAGS_NUMBER = 5;

@Injectable()
export class TaskTagPipe implements PipeTransform {

  async transform(value: Task) {

    if (!value.tags) {
      return value;
    }
    if (value.tags.length > MAX_TAGS_NUMBER) {
      throw new BadRequestException('You can use only 5 tags');
    }
    const re = new RegExp('^[a-zA-Z].*');
    value.tags = [...new Set(value.tags)];
    value.tags = value.tags.map((tag) => {
      if (!re.test(tag)) {
        throw new BadRequestException('Each tag must start from letter');
      }
      return tag.toLocaleLowerCase();
    })
    return value;
  }
}