import { CRUDRepository } from '@project/util/util-types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { Comment } from '@project/shared/app-types';
import { PrismaService } from './prisma/prisma.service';
import { CommentQuery } from './query/comment.query';
import { TASK_NOT_FOUND } from './comment.constants';

@Injectable()
export class CommentRepository implements CRUDRepository<CommentEntity, number, Comment>{
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: CommentEntity): Promise<Comment> {
    const entityData = item.toObject();
    try{
      await this.prisma.task.update({
        where:{
          taskId: entityData.taskId
        },
        data:{
          commentsCount: { increment: 1 }
        }
      });
    } catch{
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    
    return this.prisma.comment.create({
      data: {
        ...entityData
      }
    });
  } 

  public async destroy(commentId: number): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        commentId,
      }
    });
  }

  public async findById(commentId: number): Promise<Comment | null> {
    return this.prisma.comment.findFirst({
      where: {
        commentId,
      },
    });
  }

  public update(commentId: number, item: CommentEntity): Promise<Comment> {
    return this.prisma.comment.update({
      where: {
        commentId
      },
      data: { ...item.toObject(), commentId }
    });
  }

  public find({ limit, page }: CommentQuery): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }
}