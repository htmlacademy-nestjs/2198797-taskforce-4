import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "@project/shared/app-types";
import { TaskCity } from '@project/shared/app-types';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  public email: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',
  })
  public dateBirth: Date;

  @ApiProperty({
    description: 'User city in Moscow/SaintPetersburg/Vladivostok',
    example: 'SaintPetersburg',
  })
  public city: TaskCity;

  @ApiProperty({
    description: 'User first name',
    example: 'Ivan',
  })
  public firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Ivanov'
  })
  public lastName: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  public password: string;

  @ApiProperty({
    description: 'User role',
    example: 'Client'
  })
  public role: UserRole;

  @ApiProperty({
    description: 'User specialization',
    example: 'Cats, Dogs'
  })
  public specialization: string[];

  @ApiProperty({
    description: 'User information',
    example: 'Really kind person'
  })
  public userInformation: string;
}
