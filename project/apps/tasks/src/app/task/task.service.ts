import { Injectable, NotFoundException, } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CategoryRepository } from '../category/category.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './task.entity';
import { TASK_NOT_FOUND } from './task.constatnts';
import { Task } from '@project/shared/app-types';
import { TaskQuery } from './query/task.query';
import { TaskStatus } from '@project/shared/app-types';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { AddTaskResponseDto } from './dto/add-task-response.dto';


@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly categoryRepository: CategoryRepository
  ) { }

  async create(dto: CreateTaskDto): Promise<Task> {
    const category = await this.categoryRepository.findById(dto.category);
    const taskEntity = new TaskEntity({ ...dto, comments: [], status: TaskStatus.New, creatorId: '1234', category });
    return this.taskRepository.create(taskEntity);
  }

  public async delete(id: number) {
    const existTask = await this.taskRepository.findById(id);

    if (!existTask) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    await this.taskRepository.destroy(id);
  }

  public async update(id: number, dto: UpdateTaskDto) {
    const existTask = await this.taskRepository.findById(id);

    if (!existTask) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }
    const newTaskEntity = new TaskEntity({ ...existTask, ...dto });

    return await this.taskRepository.update(id, newTaskEntity);
  }

  public async getTask(id: number) {
    const existTask = await this.taskRepository.findById(id);

    if (!existTask) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    return existTask;
  }

  async getTasks(query: TaskQuery): Promise<Task[]> {
    return this.taskRepository.find(query);
  }

  public async updateTaskStatus(dto: UpdateTaskStatusDto) {
    const existTask = await this.taskRepository.findById(dto.id);

    if (!existTask) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }
    const newTaskEntity = new TaskEntity({ ...existTask, status: dto.status });

    return await this.taskRepository.update(dto.id, newTaskEntity);
  }

  public async getNewTasks(): Promise<Task[]> {
    return this.taskRepository.findNew();
  }

  public async addTaskResponse(id: number, dto: AddTaskResponseDto): Promise<Task>{
    const existTask = await this.taskRepository.findById(id);

    if (!existTask) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }
    existTask.responses.push(dto.executorId);
    existTask.responses = [...new Set(existTask.responses)];
    existTask.responsesCount = existTask.responses.length ;
    const newTaskEntity = new TaskEntity({...existTask});
    return await this.taskRepository.update(id, newTaskEntity);
  }
}
