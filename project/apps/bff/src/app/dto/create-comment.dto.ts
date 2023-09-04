import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
	@ApiProperty({
		description: 'Comment texct',
		example: 'Good morning'
	})
	public message: string;

	@ApiProperty({
		description: 'The uniq task ID for which the comment ',
		example: '13'
	})
	public taskId: number;
}