export interface Comment {
  commentId?: number;
  createdAt?: Date;
  message: string;
  taskId: number;
  userId: string;
}