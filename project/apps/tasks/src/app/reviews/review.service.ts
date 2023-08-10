import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from '@prisma/client';
import { ReviewRepository } from './review.repository';
import { Injectable } from '@nestjs/common';
import { ReviewEntity } from './review.entity';


@Injectable()
export class CategoryService {
  constructor(
    private readonly reviewRepository: ReviewRepository
  ) { }

  async createReview(dto: CreateReviewDto): Promise<Review> {
    const reviewEntity = new ReviewEntity(dto);
    return this.reviewRepository.create(reviewEntity);
  }

  async deleteCategory(id: number): Promise<void> {
    this.reviewRepository.destroy(id);
  }

  async getCategory(id: number): Promise<Review> {
    return this.reviewRepository.findById(id);
  }

  async getCategories(): Promise<Review[]> {
    return this.reviewRepository.find();
  }
}
