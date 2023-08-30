import { ApiProperty } from '@nestjs/swagger';
import { TaskCity } from '@project/shared/app-types';
import { Transform } from 'class-transformer';
import { IsInt, IsString, IsOptional, Min, Max, IsArray, IsDate, MaxLength, MinLength, IsEnum} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task name',
    example: 'Chek my friend bank account'
  })
  @IsString()
  public title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Get account password'
  })
  @IsString()
  public description: string;

  @ApiProperty({
    description: 'Completion reward ',
    example: '100'
  })
  @IsOptional()
  @Min(0, { message: 'Minimum price is 0' })
  @Max(1000000, { message: 'Maximum price is 1000000' })
  @Transform(({ value }) => Number(value))
  public price?: number;

  @ApiProperty({
    description: 'Task deadline',
    example: '2024-03-12'
  })
  @IsDate()
  @Transform(({value}) => new Date(value))
  public deadline: Date;

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
    description: 'Task city(SaintPetersburg, Moscow, Vladivostok)',
    example: 'SaintPetersburg'
  })
  @IsEnum(TaskCity)
  public city: TaskCity;

  @ApiProperty({
    description: 'Task category id',
    example: '14'
  })
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  public category: number;

  @ApiProperty({
    description: 'Task creator uniq ID',
    example: '123'
  })
  @IsString()
  @IsOptional()
  public creatorId?: string;
}


