import { TaskCity } from '@project/shared/app-types';

export class CreateNewTaskDto {

  public title: string;

  public description: string;

  public price?: number;

  public deadline: Date;

  public picture?: string;

  public address?: string;

  public tags?: string[];

  public city: TaskCity;

  public category: number;
}
