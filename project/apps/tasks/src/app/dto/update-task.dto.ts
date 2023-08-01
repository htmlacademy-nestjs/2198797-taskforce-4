import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
    @ApiProperty({
        description: 'Task name',
        example: 'Chek my friend bank account'
    })
    public name?: string;

    @ApiProperty({
        description: 'Task description',
        example: 'Get account password'
    })
    public description?: string;

    @ApiProperty({
        description: 'Task category',
        example: 'Cats'
    })
    public category?: string;

    @ApiProperty({
        description: 'Completion reward ',
        example: '100'
    })
    public price?: number;

    @ApiProperty({
        description: 'Task deadline',
        example: '2024-03-12'
    })
    public deadline?: Date;

    @ApiProperty({
        description: 'Task picture',
        example: '/images/task.png'
    })
    public picture?: string;

    @ApiProperty({
        description: 'Job Address',
        example: 'Red square'
    })
    public address?: string;

    @ApiProperty({
        description: 'Task tags',
        example: 'search,dance,squash'
    })
    public tags?: string;

    @ApiProperty({
        description: 'Task city',
        example: 'St. Petersburg'
    })
    public city?: string;
}
