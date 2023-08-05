import { Injectable, NotFoundException, } from '@nestjs/common';
import { TaskMemoryRepository } from './task-memory.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import dayjs from 'dayjs';
import { TaskEntity } from './task.entity';
import { TASK_NOT_FOUND } from './task.constants';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskMemoryRepository
  ) { }

  public async create(dto: CreateTaskDto) {
    const { name, description, category, price, deadline, address, tags, city } = dto;

    const task = {
      name, description, category, price,
      picture: '', deadline: dayjs(deadline).toDate(),
      creationDate: dayjs().toDate(),
      address, tags, city, userId: ''
    };

    const taskEntity = await new TaskEntity(task)

    return this.taskRepository
      .create(taskEntity);
  }

  public async delete(id: string) {
    const existTask = await this.taskRepository.findById(id);

    if (!existTask) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    await this.taskRepository.destroy(id);
  }

  public async update(id: string, dto: UpdateTaskDto) {
    const existTask = await this.taskRepository.findById(id);

    if (!existTask) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }
    const newTaskEntity = await new TaskEntity({ ...existTask, ...dto });

    return await this.taskRepository.update(id, newTaskEntity);
  }

  public async getTask(id: string) {
    const existTask = await this.taskRepository.findById(id);

    if (!existTask) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    return existTask;
  }
}
