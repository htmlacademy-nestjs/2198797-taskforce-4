import { ReviewService } from './review.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseInterceptors } from '@nestjs/common';
import { fillObject } from "@project/util/util-core";
import { ReviewRdo } from './rdo/review.rdo';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewInterceptor } from './interceptors/review.interceptor';
import { TaskService } from '../task/task.service';

@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly taskService: TaskService
  ) { }
  @Get('/:id')
  async show(@Param('id') id: number) {
    const existReview = await this.reviewService.getReview(id);
    return fillObject(ReviewRdo, existReview);
  }

  @UseInterceptors(ReviewInterceptor)
  @Post('/create/:id')
  async create(@Body() dto: CreateReviewDto, @Param('id') taskId: number) {
    const newReview = await this.reviewService.createReview(taskId, dto);
    const task = await this.taskService.getTask(taskId);
    const response = fillObject(ReviewRdo, newReview);
    return {...response, executorId: task.executorId};
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    await this.reviewService.deleteReview(id);
  }
}
