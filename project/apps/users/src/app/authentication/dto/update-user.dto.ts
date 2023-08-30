import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsDate, IsEnum, IsOptional, IsString, Length } from 'class-validator'
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
  public dateBirth: Date;

  @ApiProperty({
    description: 'User city',
    example: 'St. Petersburg',
  })
  @IsEnum(TaskCity)
  public city: TaskCity;

  @ApiProperty({
    description: 'User first name',
    example: 'Ivan',
  })
  @IsString()
  @Length(3, 50)
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Ivanov'
  })
  @IsString()
  @Length(3, 50)
  public lastname: string;

  @IsArray()
  @ArrayMaxSize(5)
  public specialization: string[];

  @IsString()
  @Length(1, 300)
  @IsOptional()
  public userInformation: string;
}