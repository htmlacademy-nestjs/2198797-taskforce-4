import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constant';
import { TaskUserEntity } from '../task-user/task-user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { TaskUserRepository } from '../task-user/task-user.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload, User } from '@project/shared/app-types';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordUserDto } from './dto/change-password-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly taskUserRepository: TaskUserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) { }

  public async register(dto: CreateUserDto) {
    const { email, password } = dto;

    const existUser = await this.taskUserRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new TaskUserEntity(dto)
      .setPassword(password)

    return this.taskUserRepository
      .create(userEntity);
  }


  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.taskUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const taskUserEntity = new TaskUserEntity(existUser);
    if (!await taskUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return taskUserEntity.toObject();
  }

  public async getUser(id: string) {
    return this.taskUserRepository.findById(id);
  }

  public async createUserToken(user: User) {
    const payload: TokenPayload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      lastname: user.lastname,
      firstname: user.firstname,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }

  public async updateUser(id: string, dto: UpdateUserDto) {
    const existUser = await this.taskUserRepository
      .findById(id);

    if (!existUser) {
      throw new ConflictException(AUTH_USER_NOT_FOUND);
    }
    const userEntity = new TaskUserEntity({...existUser, ...dto});
    return this.taskUserRepository.update(id, userEntity);
  }

  public async changePassword(dto: ChangePasswordUserDto) {
    const { email, password, newPassword } = dto;
    const existUser = await this.taskUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const taskUserEntity = new TaskUserEntity(existUser);
    if (!await taskUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }
  
    const userEntity = await new TaskUserEntity(existUser).setPassword(newPassword);
    return this.taskUserRepository.update(userEntity._id, userEntity);
  }
}
