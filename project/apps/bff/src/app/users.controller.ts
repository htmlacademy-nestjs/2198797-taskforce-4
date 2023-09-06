import { Body, Controller, Get, Param, Patch, Post, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApplicationServiceURL } from './app.config';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateNewPasswordDto } from './dto/create-new-password.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { TokenPayload, UserRole } from '@project/shared/app-types';
import { fillObject } from '@project/util/util-core';
import { ClientRdo } from './rdo/client.rdo';
import { ExecutorRdo } from './rdo/executor.rdo';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import 'multer';
import { User } from './decorators/user-decorator';
import FormData from "form-data";
import { CheckAuthGuard } from './guards/check-auth.guard';
import { FileValidationPipe } from './pipes/file-validation.pipe';
import { MAX_AVATAR_SIZE, TOO_BIG_FILE_FOR_AVATAR } from './constants/users.constants';


@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) { }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, loginUserDto);
    return data;
  }

  @Post('create')
  public async create(@Body() dto: CreateUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/register`, dto);
    return data;
  }

  @Patch('update/:id')
  public async update(@Req() req: Request, @Body() dto: UpdateUserDto, @Param('id') id: string) {

    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/update/${id}`, dto, {
      headers: {
        'Authorization': req.headers['authorization'],
        'Content-Type': 'application/json'
      }
    });
    return data;
  }

  @Post('newpsw')
  public async updatePassword(@Body() dto: CreateNewPasswordDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/newpsw`, dto);
    return data;
  }

  @Get(':id')
  public async getUser(@Param('id') id: string) {
    let { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}`);
    if (data.role === UserRole.Client) {
      const clientInfo = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/client/info/${id}`);
      data = { ...data, ...clientInfo.data };
      return fillObject(ClientRdo, { ...data, ...clientInfo.data })
    } else {
      const executorInfo = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/executor/info/${id}`);
      return fillObject(ExecutorRdo, { ...data, ...executorInfo.data });
    }
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('avatar')
  public async uploadAvatar(@Req() req: Request, @UploadedFile(new FileValidationPipe(MAX_AVATAR_SIZE, TOO_BIG_FILE_FOR_AVATAR)) file: Express.Multer.File, @User() user: TokenPayload) {
    const formData = new FormData();
    formData.append('file', file.buffer, file.originalname);
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Upload}/upload`, formData, {
      headers: {
        ...formData.getHeaders()
      }
    });
    const avatarRef = `localhost:3006${data.path}`;
    const resp = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/update/${user.sub}`, { avatar: avatarRef }, {
      headers: {
        'Authorization': req.headers['authorization'],
        'Content-Type': 'application/json'
      }
    });

    return resp.data;
  }
}
