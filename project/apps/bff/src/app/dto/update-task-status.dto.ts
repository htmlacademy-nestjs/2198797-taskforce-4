import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@project/shared/app-types';

export class UpdateTaskStatusDto {

  @ApiProperty({
    description: 'Task status',
    example: 'done'
  })
  public status: TaskStatus;
}