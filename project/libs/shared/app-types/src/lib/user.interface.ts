import { TaskCity } from "./task-cities.enum";
import { UserRole } from "./user-role.enum";

export interface User {
  _id?: string;
  email: string;
  firstname: string;
  lastname: string;
  city: TaskCity;
  dateBirth: Date;
  avatar?: string;
  passwordHash?: string;
  role: UserRole;
  createdAt?: Date;
  specialization?: string[];
  userInformation?: string;
  rating?: number;
}
