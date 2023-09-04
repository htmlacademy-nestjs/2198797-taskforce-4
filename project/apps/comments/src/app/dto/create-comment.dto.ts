import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsString, MaxLength, MinLength } from 'class-validator';


export class CreateCommentDto {
	@ApiProperty({
		description: 'Comment texct',
		example: 'Good morning'
	})
	@IsString()
	@MinLength(10)
  @MaxLength(300)
	public message: string;

	@ApiProperty({
		description: 'The uniq task ID for which the comment ',
		example: '13'
	})
	@IsInt()
  @Transform(({ value }) => parseInt(value))
	public taskId: number;

	@ApiProperty({
		description: 'The uniq user ID who left the comment ',
		example: '13'
	})
	public userId: string;
}
