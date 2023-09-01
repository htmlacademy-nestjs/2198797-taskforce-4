import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, UseInterceptors} from '@nestjs/common';
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


@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.CREATED,
    description: 'The new task has been successfully created.'
  })
  @Post('create')
  public async create(@Body(TaskTagPipe) dto: CreateTaskDto) {
    const newTask = await this.taskService.create(dto);
    return fillObject(TaskRdo, newTask);
  }

  @Get('new')
  async getNew() {
    const tasks = await this.taskService.getNewTasks();
    return fillObject(TaskRdo, tasks);
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

  @Get('/')
  async index(@Query() query: TaskQuery) {
    const tasks = await this.taskService.getTasks(query);
    return fillObject(TaskRdo, tasks);
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
