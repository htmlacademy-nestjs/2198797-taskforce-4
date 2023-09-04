import { ApiProperty } from "@nestjs/swagger";

export class CreateNewPswDto {

  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  public password: string;

  @ApiProperty({
    description: 'User new password',
    example: '123456'
  })
  public newPassword: string;
}
