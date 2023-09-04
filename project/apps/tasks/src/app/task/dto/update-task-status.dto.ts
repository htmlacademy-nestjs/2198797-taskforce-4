import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '@project/shared/app-types';

export class UpdateTaskStatusDto {

  @ApiProperty({
    description: 'Task status',
    example: 'done'
  })
  @IsEnum(TaskStatus)
  public status: TaskStatus;

  @ApiProperty({
    description: 'Task executor Id',
    example: '123'
  })
  @IsOptional()
  @IsString()
  public executorId?: string;

}