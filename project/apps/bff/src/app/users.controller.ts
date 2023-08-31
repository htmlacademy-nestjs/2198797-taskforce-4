import { Body, Controller, Get, Param, Patch, Post, Req, UseFilters } from '@nestjs/common';
import { ApplicationServiceURL } from './app.config';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/crete-new-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateNewPswDto } from './dto/crete_new-user-psw.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';

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
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}`);
    return data;
  }
}
