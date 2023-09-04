import { TaskCity } from "@project/shared/app-types";

export class CreateNewTaskDto {

  public title: string;

  public description: string;

  public price?: number;

  public city: TaskCity;

}
