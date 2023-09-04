import { ApiProperty } from "@nestjs/swagger";

export class CreateReviewDto {
  @ApiProperty({
    description: 'Text',
    example: 'Good job'
  })
  public message: string;

  @ApiProperty({
    description: 'Grade of work 1-5',
    example: '5'
  })
  public grade: number;

}
