import { TaskCity } from '@project/shared/app-types';
import { UserRole } from '@project/shared/app-types';

export class UserRdo {

  public id: string;

  public avatar: string;

  public dateBirth: string;

  public email: TaskCity;

  public firstname: string;

  public lastname: string;

  public city: string;

  public specialization: string[];

  public userInformation: string;

  public createdAt: Date;

  public role:UserRole;

}