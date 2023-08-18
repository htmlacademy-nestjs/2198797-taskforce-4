import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsISO8601, IsString, Length } from 'class-validator'
import { UserRole } from "@project/shared/app-types";
import { AUTH_USER_DATE_BIRTH_NOT_VALID, AUTH_USER_EMAIL_NOT_VALID } from '../authentication.constant';
import { Transform } from 'class-transformer';


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
  @IsISO8601({}, { message: AUTH_USER_DATE_BIRTH_NOT_VALID })
  public dateBirth: string;

  @ApiProperty({
    description: 'User city',
    example: 'St. Petersburg',
  })
  @IsString()
  public city: string;

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
  @Transform(({ value }) => ("" + value).toLowerCase())
  @IsEnum(UserRole)
  public role: UserRole;
}
