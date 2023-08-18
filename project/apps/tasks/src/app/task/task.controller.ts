import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskRdo } from './rdo/task.rdo';
import { CreateTaskDto } from './dto/create-task.dto';
import { fillObject } from '@project/util/util-core';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskQuery } from './query/task.query';

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
  public async create(@Body() dto: CreateTaskDto) {
    const newTask = await this.taskService.create(dto);
    return fillObject(TaskRdo, newTask);
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
  public async update(@Body() dto: UpdateTaskDto, @Param('id') id: number) {
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
}
