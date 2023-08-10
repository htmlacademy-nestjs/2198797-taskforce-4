export interface Review {
  reviewId?: number;
  createdAt?: Date;
  message: string;
  grade: number;
  taskId: number;
}