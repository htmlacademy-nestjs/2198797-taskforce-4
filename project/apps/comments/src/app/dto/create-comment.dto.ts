import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment texct',
    example: 'Good morning'
  })
  public text: string;

  @ApiProperty({
    description: 'The uniq task ID for which the comment ',
    example: '13'
  })
  public taskId: string;

  @ApiProperty({
    description: 'The uniq user ID who left the comment ',
    example: '13'
  })
  public userId: string;
}

