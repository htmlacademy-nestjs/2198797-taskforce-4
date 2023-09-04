import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TaskCity } from '@project/shared/app-types';
import { UserRole } from '@project/shared/app-types';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png'
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'User date birth (ISO format)',
    example: '1981-03-12'
  })
  @Expose()
  public dateBirth: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local'
  })
  @Expose()
  public email: TaskCity;

  @ApiProperty({
    description: 'User first name',
    example: 'Ivan'
  })
  @Expose()
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Ivanov'
  })
  @Expose()
  public lastname: string;

  @ApiProperty({
    description: 'User city in Moscow/SaintPetersburg/Vladivostok',
    example: 'Moscow'
  })
  @Expose()
  public city: string;

  @ApiProperty({
    description: 'User specialization',
    example: '[Cats, Dogs]'
  })
  @Expose()
  public specialization: string[];

  @ApiProperty({
    description: 'User information',
    example: 'Very kind person'
  })
  @Expose()
  public userInformation: string;

  @ApiProperty({
    description: 'Creation date (ISO format)',
    example: '1981-03-12'
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'User role',
    example: 'Client'
  })
  @Expose()
  public role:UserRole;

}
