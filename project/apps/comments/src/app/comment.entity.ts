import { Comment } from '@project/shared/app-types';


export class CommentEntity implements Comment {
  public _id?: string;
  public text: string;
  public creationDate: Date;
  public taskId: string;
  public userId: string;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }
  public toObject() {
    return {
      _id: this._id,
      text: this.text,
      creationDate: this.creationDate,
      taskId: this.taskId,
      userId: this.userId,
    };
  }
  public fillEntity(comment: Comment) {
    this._id = comment._id;
    this.text = comment.text;
    this.creationDate = comment.creationDate,
      this.taskId = comment.taskId;
    this.userId = comment.userId;
  }
}
