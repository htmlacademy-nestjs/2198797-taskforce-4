import { ApiProperty } from '@nestjs/swagger';
import { TaskCity } from '@project/shared/app-types';

export class UpdateUserDto {

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
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Ivanov'
  })
  public lastname: string;

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