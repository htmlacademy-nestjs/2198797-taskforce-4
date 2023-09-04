import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsDate, IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator'
import { UserRole } from "@project/shared/app-types";
import { AUTH_USER_DATE_BIRTH_NOT_VALID, AUTH_USER_EMAIL_NOT_VALID } from '../authentication.constant';
import { Transform } from 'class-transformer';
import { TaskCity } from '@project/shared/app-types';


export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',
  })
  @IsDate({ message: AUTH_USER_DATE_BIRTH_NOT_VALID })
  @Transform(({value}) => new Date(value))
  public dateBirth: Date;

  @ApiProperty({
    description: 'User city in Moscow/SaintPetersburg/Vladivostok',
    example: 'SaintPetersburg',
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

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  @Length(6, 12)
  public password: string;

  @ApiProperty({
    description: 'User role',
    example: 'Client'
  })
  @IsEnum(UserRole)
  public role: UserRole;

  @IsArray()
  @ArrayMaxSize(5)
  public specialization: string[];

  @IsString()
  @Length(1,300)
  @IsOptional()
  public userInformation: string;
}
