import { ReviewService } from './review.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { fillObject } from "@project/util/util-core";
import { ReviewRdo } from './rdo/review.rdo';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService
  ) { }
  @Get('/:id')
  async show(@Param('id') id: number) {
    const existReview = await this.reviewService.getReview(id);
    return fillObject(ReviewRdo, existReview);
  }

  @Post('/create')
  async create(@Body() dto: CreateReviewDto) {
    console.log(dto);
    const newReview = await this.reviewService.createReview(dto);
    return fillObject(ReviewRdo, newReview);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.reviewService.deleteReview(id);
  }
}
