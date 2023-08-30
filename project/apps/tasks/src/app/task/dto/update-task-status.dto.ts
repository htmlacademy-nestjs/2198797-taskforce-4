import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt } from 'class-validator';
import { TaskStatus } from '@project/shared/app-types';
import { Transform } from 'class-transformer';

export class UpdateTaskStatusDto {

  @ApiProperty({
    description: 'Task uniq id',
    example: '12'
  })
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  public id: number

  @ApiProperty({
    description: 'Task status',
    example: 'done'
  })
  @IsEnum(TaskStatus)
  public status: TaskStatus;


}