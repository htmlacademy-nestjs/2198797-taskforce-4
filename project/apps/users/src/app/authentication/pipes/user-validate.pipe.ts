import { PipeTransform, Injectable, BadRequestException} from '@nestjs/common';
import { User } from '@project/shared/app-types';

@Injectable()
export class UserValidationPipe implements PipeTransform {

  async transform(value: User) {
    const today = new Date();
    const birthdayDate= new Date(value.dateBirth);
    const age = today.getFullYear() - birthdayDate.getFullYear();
    if(age < 18){
      throw new BadRequestException("Your age must be over 18")
    }

    return value;
  }
}
