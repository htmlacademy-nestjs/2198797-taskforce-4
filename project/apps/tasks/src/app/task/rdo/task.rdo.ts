import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Comment, Category, Review } from '@project/shared/app-types';
import { TaskStatus } from '@project/shared/app-types';
import { TaskCity } from '@project/shared/app-types';

export class TaskRdo {
  @ApiProperty({
    description: 'The uniq task ID',
    example: '13'
  })
  @Expose({ name: 'taskId' })
  public taskId: string;

  @ApiProperty({
    description: 'Task name',
    example: 'Chek my friend bank account'
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Get account password'
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Task category',
    example: 'Cats'
  })
  @Expose()
  public category: Category;

  @ApiProperty({
    description: 'Completion reward ',
    example: '100'
  })
  @Expose()
  public price: string;

  @ApiProperty({
    description: 'Date of creation',
    example: '1981-03-12'
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'Task deadline',
    example: '2024-03-12'
  })
  @Expose()
  public deadline: string;

  @ApiProperty({
    description: 'Task picture',
    example: '/images/task.png'
  })
  @Expose()
  public picture: string;

  @ApiProperty({
    description: 'Job Address',
    example: 'Red square'
  })
  @Expose()
  public address: string;

  @ApiProperty({
    description: 'Task tags',
    example: 'search,dance,squash'
  })
  @Expose()
  public tags: string[];

  @ApiProperty({
    description: 'Task city',
    example: 'Moscow'
  })
  @Expose()
  public city: TaskCity;

  @ApiProperty({
    description: 'Task status',
    example: 'done'
  })
  @Expose()
  public status?: TaskStatus;

  @ApiProperty({
    description: 'The uniq creator ID',
    example: '13'
  })
  @Expose()
  public creatorId: string;

  @ApiProperty({
    description: 'The uniq execitor ID',
    example: '15'
  })
  @Expose()
  public executorId: string;

  @ApiProperty({
    description: 'Task comments',
    example: '15'
  })
  @Expose()
  public comments: Comment[];

  @Expose()
  public review: Review;

  @Expose()
  public responses: string[];

  @Expose()
  public responsesCount: number;

  @Expose()
  public commentsCount: number;

}
