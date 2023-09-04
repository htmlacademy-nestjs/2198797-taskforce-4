import { TaskCity } from '@project/shared/app-types';
import { TaskSort } from '@project/shared/app-types';
import { DEFAULT_SORT_DIRECTION, DEFAULT_TASK_COUNT_LIMIT } from '../constants/task.constants';

export class TaskQuery {

  public limit = DEFAULT_TASK_COUNT_LIMIT;

  public categories?: number[];

  public tag?: string;

  public taskCity?: TaskCity;
 
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  public page: number;

  public sortBy: TaskSort;

}