import { CRUDRepository } from '@project/util/util-types';
import { CommentEntity } from './comment.entity';
import { Comment } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentMemoryRepository implements CRUDRepository<CommentEntity, number, Comment> {

  private repository: Record<number, Comment> = {};

  public async create(item: CommentEntity): Promise<Comment> {
    const entry = {
      ...item.toObject(),
      commentId: Math.floor(Math.random() * 10)
    };
    this.repository[entry.commentId] = entry;
    return entry;
  }

  public async findById(id: number): Promise<Comment | null> {
    if (this.repository[id]) {
      return { ...this.repository[id] };
    }

    return null;
  }

  public async destroy(id: number): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: number, item: CommentEntity): Promise<Comment> {
    this.repository[id] = { ...item.toObject(), commentId: id };
    return this.findById(id);
  }
}
