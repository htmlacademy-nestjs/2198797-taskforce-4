import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { TaskEntity } from './task.entity';
import { Client, Task } from '@project/shared/app-types';
import { PrismaService } from '../prisma/prisma.service';
import { TaskQuery } from './query/task.query';
import { TaskStatus } from '@project/shared/app-types';
import { TaskCity } from '@project/shared/app-types';
import { Executor } from '@project/shared/app-types';
import { StatusQuery } from './query/status.query';


@Injectable()
export class TaskRepository implements CRUDRepository<TaskEntity, number, Task> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: TaskEntity): Promise<Task> {
    const entityData = item.toObject();
    const dbResponse = await this.prisma.task.create({
      data: {
        ...entityData,
        comments: {
          connect: []
        },
        category: {
          connect: { categoryId: entityData.category.categoryId }
        },
        review: {
        },
      },
      include: {
        comments: true,
        category: true,
        review: true,
      }
    });

    return ({ ...dbResponse, status: TaskStatus[dbResponse.status], city: TaskCity[dbResponse.city] });
  }

  public async destroy(taskId: number): Promise<void> {
    await this.prisma.task.delete({
      where: {
        taskId,
      }
    });
  }

  public async findById(taskId: number): Promise<Task | null> {
    const dbResponse = await this.prisma.task.findFirst({
      where: {
        taskId
      },
      include: {
        comments: true,
        category: true,
        review: true,
      }
    });
    if(dbResponse){
      return ({ ...dbResponse, status: TaskStatus[dbResponse.status], city: TaskCity[dbResponse.city] });
    } else {
      return null;
    }
    
  }

  public async find({ limit, categories, sortDirection, page, tag, taskCity, sortBy }: TaskQuery): Promise<Task[]> {
    const dbResponse = await this.prisma.task.findMany({
      where: {
        category: {
          categoryId: {
            in: categories
          }
        },
        ...(tag ? { tags: { has: tag } } : {}),
        city: taskCity,
        status: TaskStatus.New,
      },
      take: limit,
      include: {
        comments: true,
        category: true,
        review: true,
      },
      orderBy: [
        { [sortBy]: sortDirection }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });

    return (dbResponse.map((element) => { return { ...element, status: TaskStatus[element.status], city: TaskCity[element.city] } }));
  }

  public async update(taskId: number, item: TaskEntity): Promise<Task> {
    const entityData = item.toObject();
    const dbResponse = await this.prisma.task.update({
      where: {
        taskId,
      },
      data: {
        ...entityData,
        comments: {
          connect: []
        },
        category: {
          connect: { categoryId: entityData.category.categoryId }
        },
        review: {
        },
      },
      include: {
        comments: true,
        category: true,
        review: true,
      },
    });
    return ({ ...dbResponse, status: TaskStatus[dbResponse.status], city: TaskCity[dbResponse.city] });
  }

  public async getExecutorInfo(executorId: string): Promise<Executor> {
    const allTasks = await this.prisma.task.findMany({
      where: {
        executorId
      },
      include: {
        comments: true,
        category: true,
        review: true,
      },
    });
    const failureTasks = await this.prisma.task.findMany({
      where: {
        executorId,
        status: TaskStatus.Failure
      },
      include: {
        comments: true,
        category: true,
        review: true,
      },
    });
    const doneTasks = await this.prisma.task.findMany({
      where: {
        executorId,
        status: TaskStatus.Done
      },
      include: {
        comments: true,
        category: true,
        review: true,
      },
    });
    let grade = 0;
    allTasks.forEach((task) => {
      if (task.review) {
        grade += task.review.grade
      }
    });

    return {
      rating: grade / (allTasks.length + failureTasks.length),
      failureTasks: failureTasks.length,
      doneTasks: doneTasks.length
    }
  }

  public async getClientInfo(clientId: string): Promise<Client> {
    const allTasks = await this.prisma.task.findMany({
      where: {
        creatorId: clientId
      },
    });
    const newTasks = await this.prisma.task.findMany({
      where: {
        creatorId: clientId,
        status: TaskStatus.New
      },
    });
    return {
      allTasks: allTasks.length,
      newTasks: newTasks.length
    }
  }

  public async getExecutorTasks(executorId: string, {status}: StatusQuery): Promise<Task[]>{
    const dbResponse = await this.prisma.task.findMany({
      where: {
        executorId,
        status
        },
      include: {
        comments: true,
        category: true,
        review: true,
      },
      orderBy: [
        { status: 'desc' }
      ],
    });

    return (dbResponse.map((element) => { return { ...element, status: TaskStatus[element.status], city: TaskCity[element.city] } }));
  }

  public async getClientTasks(clientId: string, {status}: StatusQuery): Promise<Task[]>{
    const dbResponse = await this.prisma.task.findMany({
      where: {
        creatorId: clientId,
        status
        },
      include: {
        comments: true,
        category: true,
        review: true,
      },
    });

    return (dbResponse.map((element) => { return { ...element, status: TaskStatus[element.status], city: TaskCity[element.city] } }));
  }

}