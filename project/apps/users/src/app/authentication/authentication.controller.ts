import { Body, Controller, Get, Param, Post, HttpCode, HttpStatus, UseGuards, Patch, Req } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRdo } from './rdo/user.rdo';
import { fillObject } from '@project/util/util-core';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MongoIdValidationPipe } from '@project/shared/shared-pipes';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { NotifyService } from '../notify/notify.service';
import { UserValidationPipe } from './pipes/user-validate.pipe'
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordUserDto } from './dto/change-password-user.dto';
import { RabbitRouting, RequestWithTokenPayload, UserRole } from '@project/shared/app-types';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { UserRatingDto } from './dto/user-rating.dto';



@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService,
  ) { }




  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @Post('register')
  public async create(@Body(UserValidationPipe) dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    if (newUser.role === UserRole.Executor) {
      const { email, firstName, lastName } = newUser;
      await this.notifyService.registerSubscriber({ email, firstName, lastName })
    }
    return fillObject(UserRdo, newUser);
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    const loggedUser = await this.authService.createUserToken(verifiedUser);
    return fillObject(LoggedUserRdo, Object.assign(verifiedUser, loggedUser));
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authService.getUserWithRank(id);

    return fillObject(UserRdo, existUser);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has been successfuly updated'
  })
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  public async update(@Req() req: Request, @Param('id', MongoIdValidationPipe) id: string, @Body(UserValidationPipe) dto: UpdateUserDto) {
    const user = await this.authService.updateUser(id, dto);
    return fillObject(UserRdo, user);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user password has been successfuly changed'
  })
  @Post('newpsw')
  public async changePsw(@Body() dto: ChangePasswordUserDto) {
    const user = await this.authService.changePassword(dto);
    return fillObject(UserRdo, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }

  @RabbitSubscribe({
    exchange: 'taskforce.notify',
    routingKey: RabbitRouting.UpdateUserRating,
    queue: 'task.user',
  })
  public async updateUserRating(dto: UserRatingDto){
    await this.authService.updateUser(dto.userId, {rating: dto.rating});
  }

}
