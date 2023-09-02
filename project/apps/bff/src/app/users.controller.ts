import { Body, Controller, Get, Param, Patch, Post, Req, UseFilters } from '@nestjs/common';
import { ApplicationServiceURL } from './app.config';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/crete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateNewPswDto } from './dto/crete_new-user-psw.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { UserRole } from '@project/shared/app-types';
import { fillObject } from '@project/util/util-core';
import { ClientRdo } from './rdo/client.rdo';
import { ExecutorRdo } from './rdo/executor.rdo';


@Controller('users')
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) { }

  @Post('login')
  @UseFilters(AxiosExceptionFilter)
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, loginUserDto);
    return data;
  }

  @Post('create')
  @UseFilters(AxiosExceptionFilter)
  public async create(@Body() dto: CreateUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/register`, dto);
    return data;
  }

  @Patch('update/:id')
  @UseFilters(AxiosExceptionFilter)
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
  @UseFilters(AxiosExceptionFilter)
  public async newpsw(@Body() dto: CreateNewPswDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/newpsw`, dto);
    return data;
  }

  @Get(':id')
  @UseFilters(AxiosExceptionFilter)
  public async getUser(@Param('id') id: string) {
    let {data} = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}`);
    let resp;
    if(data.role === UserRole.Client){
      const clientInfo = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/client/info/${id}`);
      data = {...data, ...clientInfo.data};
      resp  = fillObject(ClientRdo,{...data, ...clientInfo.data});
    }
    if(data.role === UserRole.Executor){
      const executorInfo = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/executor/info/${id}`);
      resp  = fillObject(ExecutorRdo,{...data, ...executorInfo.data});
    }
    return resp;
  }
}
