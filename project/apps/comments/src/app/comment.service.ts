import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';
import { COMMENT_NOT_FOUND } from './comment.constants';
import { CommentQuery } from './query/comment.query';
import { Comment } from '@project/shared/app-types';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository
  ) { }

  public async create(dto: CreateCommentDto) {
    const commentEntity = await new CommentEntity(dto)

    return this.commentRepository
      .create(commentEntity);
  }

  public async delete(id: number) {
    const existComment = await this.commentRepository.findById(id);

    if (!existComment) {
      throw new NotFoundException(COMMENT_NOT_FOUND);
    }

    await this.commentRepository.destroy(id);
  }

  public async update(id: number, dto: CreateCommentDto) {
    const existComment = await this.commentRepository.findById(id);

    if (!existComment) {
      throw new NotFoundException(COMMENT_NOT_FOUND);
    }
    const newCommentEntity = await new CommentEntity({ ...existComment, ...dto });

    return await this.commentRepository.update(id, newCommentEntity);
  }

  public async getComment(id: number) {
    const existComment = await this.commentRepository.findById(id);

    if (!existComment) {
      throw new NotFoundException(COMMENT_NOT_FOUND);
    }

    return existComment;
  }

  async getComments(query: CommentQuery): Promise<Comment[]> {
    return this.commentRepository.find(query);
  }

}
