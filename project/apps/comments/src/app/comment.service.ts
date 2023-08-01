import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentMemoryRepository } from './comment-memory.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import dayjs from 'dayjs';
import { CommentEntity } from './comment.entity';
import { COMMENT_NOT_FOUND } from './comment.constants';

@Injectable()
export class CommentService {
    constructor(
        private readonly commentRepository: CommentMemoryRepository
    ) { }

    public async create(dto: CreateCommentDto) {
        const { text, taskId, userId } = dto;

        const comment = {
            text, taskId, creationDate: dayjs().toDate(), userId
        };

        const commentEntity = await new CommentEntity(comment)

        return this.commentRepository
            .create(commentEntity);
    }

    public async delete(id: string) {
        const existComment = await this.commentRepository.findById(id);

        if (!existComment) {
            throw new NotFoundException(COMMENT_NOT_FOUND);
        }

        await this.commentRepository.destroy(id);
    }

    public async update(id: string, dto: CreateCommentDto) {
        const existComment = await this.commentRepository.findById(id);

        if (!existComment) {
            throw new NotFoundException(COMMENT_NOT_FOUND);
        }
        const newCommentEntity = await new CommentEntity({ ...existComment, ...dto });

        return await this.commentRepository.update(id, newCommentEntity);
    }

    public async getComment(id: string) {
        const existComment = await this.commentRepository.findById(id);

        if (!existComment) {
            throw new NotFoundException(COMMENT_NOT_FOUND);
        }

        return existComment;
    }
}
