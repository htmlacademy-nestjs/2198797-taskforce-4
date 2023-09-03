import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskRdo } from './rdo/task.rdo';
import { CreateTaskDto } from './dto/create-task.dto';
import { fillObject } from '@project/util/util-core';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskQuery } from './query/task.query';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskTagPipe } from './pipes/task-tag.pipe';
import { AddTaskResponseDto } from './dto/add-task-response.dto';
import { TaskStatusInterseptor } from './interceptors/task-status.interceptor';
import { ExecutorRdo } from './rdo/executor.rdo';
import { ClientRdo } from './rdo/client.rdo';
import { StatusQuery } from './query/status.query';
import { NotifyService } from '../notify/notify.service';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly notifyService: NotifyService) { }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.CREATED,
    description: 'The new task has been successfully created.'
  })
  @Post('create')
  public async create(@Body(TaskTagPipe) dto: CreateTaskDto) {
    const newTask = await this.taskService.create(dto);
    this.notifyService.addNewTask({title:newTask.title, description:newTask.description, price:newTask.price, city:newTask.city});
    return fillObject(TaskRdo, newTask);
  }

  @Get('new')
  async index(@Query() query: TaskQuery) {
    const tasks = await this.taskService.getTasks(query);
    return fillObject(TaskRdo, tasks);
  }

  @Get('client/tasks/:id')
  public async getClientTasks(@Param('id') id: string, @Query() query: StatusQuery) {
    const tasks = await this.taskService.getClientTasks(id, query);
    return fillObject(TaskRdo, tasks);
  }

  @Get('executor/tasks/:id')
  public async getExecutorTasks(@Param('id') id: string, @Query() query: StatusQuery) {
    const tasks = await this.taskService.getExecutorTasks(id, query);
    return fillObject(TaskRdo, tasks);
  }

  @Get('executor/info/:id')
  public async getRating(@Param('id') id: string) {
    const executor = await this.taskService.getRating(id);
    return fillObject(ExecutorRdo, { ...executor, executorId: id });
  }

  @Get('client/info/:id')
  public async getClientInfo(@Param('id') id: string) {
    const client = await this.taskService.getClientInfo(id);
    return fillObject(ClientRdo, { ...client, clientId: id });
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'Task found'
  })
  @Get(':id')
  public async show(@Param('id') id: number) {
    const existTask = await this.taskService.getTask(id);
    return fillObject(TaskRdo, existTask);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.CREATED,
    description: 'The task has been successfully updated.'
  })
  @Patch('update/:id')
  public async update(@Body(TaskTagPipe) dto: UpdateTaskDto, @Param('id') id: number) {
    const task = await this.taskService.update(id, dto);
    return fillObject(TaskRdo, task);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task deleted'
  })
  @Post('delete/:id')
  public async delete(@Param('id') id: number) {
    await this.taskService.delete(id);
  }

  @UseInterceptors(TaskStatusInterseptor)
  @Patch('status/:id')
  public async changeStatus(@Body() dto: UpdateTaskStatusDto, @Param('id') id: number) {
    const task = await this.taskService.updateTaskStatus(id, dto);
    return fillObject(TaskRdo, task);
  }

  @Patch('response/:id')
  public async addResponse(@Body() dto: AddTaskResponseDto, @Param('id') id: number) {
    const task = await this.taskService.addTaskResponse(id, dto);
    return fillObject(TaskRdo, task);
  }



}
