import { CategoryEntity } from './category.entity';
import { Category } from "@project/shared/app-types";
import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryRepository implements CRUDRepository<CategoryEntity, number, Category> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: CategoryEntity): Promise<Category> {
    return this.prisma.category.create({
      data: { ...item.toObject() }
    });
  }

  public async destroy(categoryId: number): Promise<void> {
    await this.prisma.category.delete({
      where: {
        categoryId,
      }
    });
  }

  public findById(categoryId: number): Promise<Category | null> {
    return this.prisma.category.findFirst({
      where: {
        categoryId
      }
    });
  }

  public find(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  public update(categoryId: number, item: CategoryEntity): Promise<Category> {
    return this.prisma.category.update({
      where: {
        categoryId
      },
      data: { ...item.toObject(), categoryId }
    });
  }
}
