import { Comment } from '@project/shared/app-types';


export class CommentEntity implements Comment {
  public commentId?: number;
  public message: string;
  public createdAt: Date;
  public taskId: number;
  public userId: string;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }
  public toObject() {
    return {
      commentId: this.commentId,
      message: this.message,
      createdAt: this.createdAt,
      taskId: this.taskId,
      userId: this.userId,
    };
  }
  public fillEntity(comment: Comment) {
    this.commentId = comment.commentId;
    this.message = comment.message;
    this.createdAt = new Date();
    this.taskId = comment.taskId;
    this.userId = comment.userId;
  }
}
