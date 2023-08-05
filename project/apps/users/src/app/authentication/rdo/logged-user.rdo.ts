import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  @Transform(({ obj }) => obj._id.toString())
  @Expose({ name: '_id' })
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Access token',
    example: 'user@user.local'
  })
  @Expose()
  public accessToken: string;
}
