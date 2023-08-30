import { ApiProperty } from '@nestjs/swagger';
import { TaskCity } from '@project/shared/app-types';
import { Transform } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Task name',
    example: 'Chek my friend bank account'
  })
  @IsOptional()
  @IsString()
  public title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Get account password'
  })
  @IsOptional()
  @IsString()
  public description: string;

  @ApiProperty({
    description: 'Completion reward ',
    example: '100'
  })
  @IsOptional()
  @Min(0, { message: 'Minimum price is 0' })
  @Max(1000000, { message: 'Maximum price is 1000000' })
  public price?: number;

  @ApiProperty({
    description: 'Task deadline',
    example: '2024-03-12'
  })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  public deadline?: Date;

  @ApiProperty({
    description: 'Task picture',
    example: '/images/task.png'
  })
  @IsString()
  @IsOptional()
  public picture?: string;

  @ApiProperty({
    description: 'Job Address',
    example: 'Red square'
  })
  @IsString()
  @IsOptional()
  public address?: string;

  @ApiProperty({
    description: 'Task tags',
    example: 'search,dance,squash'
  })
  @IsOptional()
  @IsArray()
  @MinLength(3, {
    each: true,
  })
  @MaxLength(10, {
    each: true,
  })
  public tags?: string[];

  @ApiProperty({
    description: 'Task city',
    example: 'St. Petersburg'
  })
  @IsOptional()
  @IsEnum(TaskCity)
  public city?: TaskCity;


  @ApiProperty({
    description: 'Task executor Id',
    example: '123'
  })
  @IsOptional()
  @IsString()
  public executorId?: string;

}
