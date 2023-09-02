import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';


export class ExecutorRatingRdo {
  @ApiProperty({
    description: 'The uniq executor ID',
    example: '13'
  })
  @Expose({ name: 'taskId' })
  public executorId: string;

  @ApiProperty({
    description: 'Executor rating',
    example: '5'
  })
  @Expose()
  public rating: number;
}