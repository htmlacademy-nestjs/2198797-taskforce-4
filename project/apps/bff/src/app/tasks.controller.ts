import { Body, Controller, Get, Param, Patch, Post, Query, UseFilters, UseGuards, UseInterceptors} from '@nestjs/common';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CreateNewTaskDto } from './dto/create-new-task.dto';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { CreatorIdInterceptor } from './interseptors/creatorid.interceptor';
import { ClientInterceptor } from './interseptors/client.intrceptor';
import { PermisionInterseptor } from './interseptors/permision.interceptor';
import { TokenPayload } from '@project/shared/app-types';
import { User } from './decorators/user-decorator';
import { TaskQuery } from './query/task.query';
import querystring from 'node:querystring';


@Controller('tasks')
@UseFilters(AxiosExceptionFilter)
export class TasksController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(CreatorIdInterceptor, ClientInterceptor)
  @UseFilters(AxiosExceptionFilter)
  @Post('create')
  public async create(@Body() dto: CreateNewTaskDto, @User() req: TokenPayload) {
    dto["creatorId"] = req.sub;
    console.log(dto);
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Tasks}/create`, dto);
    return data;
  }

  @UseFilters(AxiosExceptionFilter)
  @Get(':id')
  public async getTask(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/${id}`);
    return data;
  }

  @UseFilters(AxiosExceptionFilter)
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(PermisionInterseptor)
  @Patch('update/:id')
  public async update(@Body() dto: CreateNewTaskDto, @Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Tasks}/update/${id}`, dto);
    return data;
  }

  @UseFilters(AxiosExceptionFilter)
  @Get('/')
  public async getTasks(@Query() query: TaskQuery) {
    const queryStr = querystring.stringify({...query});
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}?${queryStr}`);
    return data;
  }
}