import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from '@project/shared/app-types';
import { ReviewRepository } from './review.repository';
import { Injectable } from '@nestjs/common';
import { ReviewEntity } from './review.entity';
import { UserService } from '../user/user.service';
import { TaskService } from '../task/task.service';
import { TaskRepository } from '../task/task.repository';


@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly userService: UserService,
    private readonly taskService: TaskService,
    private readonly taskRepository: TaskRepository
  ) { }

  async createReview(taskId: number, dto: CreateReviewDto): Promise<Review> {
    const { executorId } = await this.taskService.getTask(taskId);
    
    const reviewEntity = new ReviewEntity({ ...dto, taskId: taskId });
    const review = await this.reviewRepository.create(reviewEntity);

    const executor = await this.taskRepository.getExecutorInfo(executorId);
    this.userService.updateUserRating({ userId: executorId, rating: executor.rating });

    return review
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
