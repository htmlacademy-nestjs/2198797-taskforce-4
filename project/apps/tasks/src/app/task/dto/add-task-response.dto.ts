import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddTaskResponseDto {

  @ApiProperty({
    description: 'Task executor Id',
    example: '123'
  })
  @IsString()
  public executorId?: string;

}