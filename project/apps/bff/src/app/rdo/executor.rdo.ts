import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TaskCity } from '@project/shared/app-types';
import { UserRole } from '@project/shared/app-types';

export class ExecutorRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User date birth (ISO format)',
    example: '1981-03-12'
  })
  @Expose({name:'dateBirth'})
  @Transform(({ value }) => {
    const birthYear = new Date(value).getFullYear();
    const thisYear = new Date().getFullYear();
    return thisYear - birthYear;
  })
  public age: number;

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

  @ApiProperty({
    description: 'User rating',
    example: '2,75'
  })
  @Expose()
  public rating: number;

  @ApiProperty({
    description: 'Failure tasks number ',
    example: '5'
  })
  @Expose()
  public failureTasks: number;

  @ApiProperty({
    description: 'Done tasks number ',
    example: '5'
  })
  @Expose()
  public doneTasks: number;

}