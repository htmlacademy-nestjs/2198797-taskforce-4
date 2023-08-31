import { TaskCity } from '@project/shared/app-types';

export class UpdateUserDto {

  public dateBirth: Date;

  public city: TaskCity;

  public firstname: string;

  public lastname: string;

  public specialization: string[];

  public userInformation: string;
}