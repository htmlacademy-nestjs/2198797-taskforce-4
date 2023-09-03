import { TaskCity } from '@project/shared/app-types';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, Min, Max, IsDate, IsEnum} from 'class-validator';

export class CreateNewTaskDto {

  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsOptional()
  @Min(0, { message: 'Minimum price is 0' })
  @Max(1000000, { message: 'Maximum price is 1000000' })
  @Transform(({ value }) => Number(value))
  public price?: number;

  
  @IsEnum(TaskCity)
  public city: TaskCity;

}