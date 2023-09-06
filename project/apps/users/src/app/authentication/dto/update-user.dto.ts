import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsDate, IsEnum, IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator'
import { AUTH_USER_DATE_BIRTH_NOT_VALID } from '../authentication.constant';
import { Transform } from 'class-transformer';
import { TaskCity } from '@project/shared/app-types';


export class UpdateUserDto {

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',
  })
  @IsDate({ message: AUTH_USER_DATE_BIRTH_NOT_VALID })
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  public dateBirth?: Date;

  @ApiProperty({
    description: 'User city',
    example: 'St. Petersburg',
  })
  @IsEnum(TaskCity)
  @IsOptional()
  public city?: TaskCity;

  @ApiProperty({
    description: 'User first name',
    example: 'Ivan',
  })
  @IsString()
  @Length(3, 50)
  @IsOptional()
  public firstName?: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Ivanov'
  })
  @IsString()
  @Length(3, 50)
  @IsOptional()
  public lastName?: string;

  @IsArray()
  @ArrayMaxSize(5)
  @IsOptional()
  public specialization?: string[];

  @IsString()
  @Length(1, 300)
  @IsOptional()
  public userInformation?: string;

  @IsInt()
  @IsOptional()
  public rating?: number;
}