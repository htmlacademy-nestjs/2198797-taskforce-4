import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CommentRdo {
  @ApiProperty({
    description: 'The uniq comment ID',
    example: '13'
  })
  @Expose({ name: 'commentId' })
  public commentId: number;

  @ApiProperty({
    description: 'Comment texct',
    example: 'Good morning'
  })
  @Expose()
  public message: string;

  @ApiProperty({
    description: 'Date of creation',
    example: '1981-03-12'
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'The uniq task ID for which the comment ',
    example: '13'
  })
  @Expose()
  public taskId: number;

  @ApiProperty({
    description: 'The uniq user ID who left the comment ',
    example: '13'
  })
  @Expose()
  public userId: string;
}

