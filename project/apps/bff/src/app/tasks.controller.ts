import { Body, Controller, Get, Param, Patch, Post, Query, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CreateNewTaskDto } from './dto/create-new-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { TokenPayload, UserRole } from '@project/shared/app-types';
import { User } from './decorators/user-decorator';
import { TaskQuery } from './query/task.query';
import querystring from 'node:querystring';
import { StatusQuery } from './query/status.query';
import { PermissionGuard } from './guards/permission.guard';
import { StatusPermissionGuard } from './guards/status.permision.guard';
import { ClientGuard } from './guards/client.guard';
import { ExecutorGuard } from './guards/executor.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import FormData from "form-data";
import { FileValidationPipe } from './pipes/file-validation.pipe';
import { MAX_PICTURE_SIZE, TOO_BIG_FILE_FOR_PICTURE } from './constants/task.constants';


@Controller('tasks')
@UseFilters(AxiosExceptionFilter)
export class TasksController {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  @UseGuards(CheckAuthGuard, ClientGuard)
  @Post('create')
  public async create(@Body() dto: CreateNewTaskDto, @User() req: TokenPayload) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Tasks}/create`, { ...dto, creatorId: req.sub });
    return data;
  }

  @Get(':id')
  public async getTask(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/${id}`);
    return data;
  }

  @UseGuards(CheckAuthGuard, PermissionGuard)
  @Patch('update/:id')
  public async update(@Body() dto: UpdateTaskDto, @Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Tasks}/update/${id}`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard, ExecutorGuard)
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

  @UseGuards(CheckAuthGuard, StatusPermissionGuard)
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

  @UseGuards(CheckAuthGuard, PermissionGuard)
  @Post('delete/:id')
  public async delete(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Tasks}/delete/${id}`);
    return data;
  }

  @UseGuards(CheckAuthGuard, PermissionGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('picture/:id')
  public async uploadAvatar(@UploadedFile(new FileValidationPipe(MAX_PICTURE_SIZE, TOO_BIG_FILE_FOR_PICTURE)) file: Express.Multer.File, @Param('id') id:string) {
    const formData = new FormData();
    formData.append('file', file.buffer, file.originalname);
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Upload}/upload`, formData, {
      headers: {
        ...formData.getHeaders()
      }
    });
    const pictureRef = `localhost:3006${data.path}`;
    const resp = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Tasks}/update/${id}`, {picture: pictureRef});

    return resp.data;
  }
}