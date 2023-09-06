import { User, UserRole } from '@project/shared/app-types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './task-user.constant';
import { TaskCity } from '@project/shared/app-types';

export class TaskUserEntity implements User {
  public _id: string;
  public avatar: string;
  public dateBirth: Date;
  public email: string;
  public firstName: string;
  public lastName: string;
  public city: TaskCity;
  public passwordHash: string;
  public role: UserRole;
  public specialization: string[];
  public userInformation: string;
  public createdAt: Date;
  public rating: number;

  constructor(taskUser: User) {
    this.fillEntity(taskUser);
  }

  public toObject() {
    return {
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      city: this.city,
      dateBirth: this.dateBirth,
      avatar: this.avatar,
      passwordHash: this.passwordHash,
      role: this.role,
      specialization: this.specialization,
      userInformation: this.userInformation,
      createdAt: this.createdAt,
      rating: this.rating,
    };
  }

  public fillEntity(taskUser: User) {
    this._id = taskUser._id;
    this.avatar = taskUser.avatar;
    this.dateBirth = taskUser.dateBirth;
    this.email = taskUser.email;
    this.firstName = taskUser.firstName;
    this.lastName = taskUser.lastName;
    this.city = taskUser.city;
    this.passwordHash = taskUser.passwordHash;
    this.role = taskUser.role;
    this.specialization = taskUser.specialization;
    this.userInformation = taskUser.userInformation;
    this.createdAt = new Date();
    this.rating = taskUser.rating;
  }


  public async setPassword(password: string): Promise<TaskUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
