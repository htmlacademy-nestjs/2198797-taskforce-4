import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from '@project/shared/app-types';
import { ReviewRepository } from './review.repository';
import { Injectable } from '@nestjs/common';
import { ReviewEntity } from './review.entity';


@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository
  ) { }

  async createReview(dto: CreateReviewDto): Promise<Review> {
    const reviewEntity = new ReviewEntity(dto);
    console.log(reviewEntity.grade === 5);
    return this.reviewRepository.create(reviewEntity);
  }

  async deleteReview(id: number): Promise<void> {
    this.reviewRepository.destroy(id);
  }

  async getReview(id: number): Promise<Review> {
    return this.reviewRepository.findById(id);
  }

  async getReviews(): Promise<Review[]> {
    return this.reviewRepository.find();
  }
}
