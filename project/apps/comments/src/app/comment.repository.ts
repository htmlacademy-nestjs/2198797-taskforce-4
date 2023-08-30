import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { Comment } from '@project/shared/app-types';
import { PrismaService } from './prisma/prisma.service';
import { CommentQuery } from './query/comment.query';

@Injectable()
export class CommentRepository implements CRUDRepository<CommentEntity, number, Comment>{
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: CommentEntity): Promise<Comment> {
    const entityData = item.toObject();
    await this.prisma.task.update({
      where:{
        taskId: entityData.taskId
      },
      data:{
        commentsCount: { increment: 1 }
      }
    });
    
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
        commentId
      },
    });
  }

  public update(_id: number, _item: CommentEntity): Promise<Comment> {
    console.log(_id);
    console.log(_item);
    return Promise.resolve(undefined);
  }

  public find({ limit, page }: CommentQuery): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }
}