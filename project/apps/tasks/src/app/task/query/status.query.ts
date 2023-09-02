import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '@project/shared/app-types';

export class StatusQuery {
  @IsOptional()
  @IsEnum(TaskStatus)
  public status?: TaskStatus;

}