import { Injectable, NotFoundException, } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CategoryRepository } from '../category/category.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './task.entity';
import { TASK_NOT_FOUND } from './task.constatnts';
import { Task } from '@project/shared/app-types';
import { TaskQuery } from './query/task.query';


@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly categoryRepository: CategoryRepository
  ) { }

  async create(dto: CreateTaskDto): Promise<Task> {
    const category = await this.categoryRepository.findById(dto.category);
    const taskEntity = new TaskEntity({ ...dto, comments: [], status: 'new', creatorId: '1234', category });
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
    const newTaskEntity = await new TaskEntity({ ...existTask, ...dto });

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

}
