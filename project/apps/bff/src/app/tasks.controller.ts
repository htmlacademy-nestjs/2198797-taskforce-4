import { Body, Controller, Get, Param, Patch, Post, Query, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CreateNewTaskDto } from './dto/create-new-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { CreatorIdInterceptor } from './interseptors/creatorid.interceptor';
import { ClientInterceptor } from './interseptors/client.intrceptor';
import { PermisionInterseptor } from './interseptors/permision.interseptor';
import { TokenPayload, UserRole } from '@project/shared/app-types';
import { User } from './decorators/user-decorator';
import { TaskQuery } from './query/task.query';
import querystring from 'node:querystring';
import { StatusPermisionInterseptor } from './interseptors/status.permision.inceptor';
import { ExecutorInterceptor } from './interseptors/executor.interceptor';
import { StatusQuery } from './query/status.query';

@Controller('tasks')
@UseFilters(AxiosExceptionFilter)
export class TasksController {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(CreatorIdInterceptor, ClientInterceptor)
  @Post('create')
  public async create(@Body() dto: CreateNewTaskDto, @User() req: TokenPayload) {
    dto["creatorId"] = req.sub;
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Tasks}/create`, dto);
    return data;
  }

  @Get(':id')
  public async getTask(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/${id}`);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(PermisionInterseptor)
  @Patch('update/:id')
  public async update(@Body() dto: UpdateTaskDto, @Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Tasks}/update/${id}`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(ExecutorInterceptor)
  @Post('new')
  public async getNewTasks(@Query() query: TaskQuery) {
    const queryStr = querystring.stringify({ ...query });
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/new?${queryStr}`);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Post('/')
  public async getTasks(@User() req: TokenPayload, @Query() query: StatusQuery) {
    const queryStr = querystring.stringify({ ...query });
    const id = req.sub.toString();
    const role = req.role.toString();
    if (role === UserRole.Client) {
      const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/client/tasks/${id}?${queryStr}`);
      return data;
    } else {
      const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/executor/tasks/${id}?${queryStr}`);
      return data;
    }
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(StatusPermisionInterseptor)
  @Patch('status/:id')
  public async updateStatus(@Body() dto: CreateNewTaskDto, @Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Tasks}/status/${id}`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Post('response/:id')
  public async response(@User() req: TokenPayload, @Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Tasks}/response/${id}`, { executorId: req.sub });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(PermisionInterseptor)
  @Post('delete/:id')
  public async delete(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Tasks}/delete/${id}`);
    return data;
  }
}