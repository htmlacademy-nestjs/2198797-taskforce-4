import { Entity } from "@project/util/util-types";
import { Review } from "@project/shared/app-types";

export class ReviewEntity implements Entity<ReviewEntity>, Review {
  public reviewId: number;
  public createdAt?: Date;
  public message: string;
  public grade: number;
  public taskId: number;

  constructor(review: Review) {
    this.fillEntity(review);
  }

  public fillEntity(review: Review) {
    this.reviewId = review.reviewId;
    this.message = review.message;
    this.grade = review.grade;
    this.createdAt = new Date();
    this.taskId  = review.taskId;
  }

  public toObject(): ReviewEntity {
    return { ...this }
  }
}