import { UserRole } from "@project/shared/app-types";
import { TaskCity } from '@project/shared/app-types';

export class CreateUserDto {

  public email: string;

  public dateBirth: Date;

  public city: TaskCity;

  public firstname: string;

  public lastname: string;

  public password: string;

  public role: UserRole;

  public specialization: string[];

  public userInformation: string;
}
