import { Body, Controller, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentRdo } from './rdo/comment.rdo';
import { CreateCommentDto } from './dto/create-comment.dto';
import { fillObject } from '@project/util/util-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentQuery } from './query/comment.query';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: 'The new comment has been successfully created.'
  })
  @Post('create')
  public async create(@Body() dto: CreateCommentDto) {
    const newComment = await this.commentService.create(dto);
    return fillObject(CommentRdo, newComment);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Comment found'
  })
  @Get(':id')
  public async show(@Param('id') id: number) {
    const existComment = await this.commentService.getComment(id);
    return fillObject(CommentRdo, existComment);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comment deleted'
  })
  @Post('delete/:id')
  public async delete(@Param('id') id: number) {
    await this.commentService.delete(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Commens found'
  })
  @Get('/')
  async index(@Query() query: CommentQuery) {
    const comments = await this.commentService.getComments(query);
    return fillObject(CommentRdo, comments);
  }
}
