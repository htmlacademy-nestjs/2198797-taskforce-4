import { IsArray, IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_TASK_COUNT_LIMIT, DEFAULT_SORT_DIRECTION } from '../task.constants';
import { TaskCity } from '@project/shared/app-types';
import { TaskSort } from '@project/shared/app-types';

export class TaskQuery {
  @Transform(({ value } ) => +value || DEFAULT_TASK_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_TASK_COUNT_LIMIT;

  @Transform(({ value }) => value.split(',').map((categoryId) => +categoryId))
  @IsArray({})
  @IsOptional()
  public categories?: number[];

  @IsString()
  @IsOptional()
  public tag?: string;

  @IsOptional()
  @IsEnum(TaskCity)
  public taskCity?: TaskCity;
 
  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

  
  @IsOptional()
  @IsEnum(TaskSort)
  public sortBy: TaskSort;

}