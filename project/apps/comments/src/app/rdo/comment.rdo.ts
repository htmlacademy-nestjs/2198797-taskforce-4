import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CommentRdo {
  @ApiProperty({
    description: 'The uniq comment ID',
    example: '13'
  })
  @Expose({ name: '_id' })
  public id: string;

  @ApiProperty({
    description: 'Comment texct',
    example: 'Good morning'
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'Date of creation',
    example: '1981-03-12'
  })
  @Expose()
  public creationDate: Date;

  @ApiProperty({
    description: 'The uniq task ID for which the comment ',
    example: '13'
  })
  @Expose()
  public taskId: string;

  @ApiProperty({
    description: 'The uniq user ID who left the comment ',
    example: '13'
  })
  @Expose()
  public userId: string;
}

