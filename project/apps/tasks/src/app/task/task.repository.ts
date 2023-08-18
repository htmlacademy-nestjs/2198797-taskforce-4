import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { TaskEntity } from './task.entity';
import { Task } from '@project/shared/app-types';
import { PrismaService } from '../prisma/prisma.service';
import { TaskQuery } from './query/task.query';


@Injectable()
export class TaskRepository implements CRUDRepository<TaskEntity, number, Task> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: TaskEntity): Promise<Task> {
    const entityData = item.toObject();
    return this.prisma.task.create({
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
  }

  public async destroy(taskId: number): Promise<void> {
    await this.prisma.task.delete({
      where: {
        taskId,
      }
    });
  }

  public async findById(taskId: number): Promise<Task | null> {
    return this.prisma.task.findFirst({
      where: {
        taskId
      },
      include: {
        comments: true,
        category: true,
        review: true,
      }
    });
  }

  public find({ limit, categories, sortDirection, page }: TaskQuery): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        category: {
          categoryId: {
            in: categories
          }
        }
      },
      take: limit,
      include: {
        comments: true,
        category: true,
        review: true,
      },
      orderBy: [
        { createdAt: sortDirection }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public update(_id: number, _item: TaskEntity): Promise<Task> {
    console.log(_id);
    console.log(_item);
    return Promise.resolve(undefined);
  }
}