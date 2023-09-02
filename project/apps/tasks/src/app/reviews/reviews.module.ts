import { ReviewController } from "./review.controller";
import { ReviewService } from "./review.service";
import { ReviewRepository } from "./review.repository";
import { Module } from "@nestjs/common";
import { TaskModule } from "../task/task.module";


@Module({
  imports: [TaskModule],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
  exports: [ReviewRepository]
})
export class ReviewsModule { }
