import { Category, Comment, Review, Task } from '@project/shared/app-types';
import { Entity } from '@project/util/util-types';
import { TaskStatus } from '@project/shared/app-types';
import { TaskCity } from '@project/shared/app-types';


export class TaskEntity implements Entity<TaskEntity>, Task {
  public id: number;
  public title: string;
  public description: string;
  public price: number;
  public createdAt: Date;
  public deadline: Date;
  public picture: string;
  public address: string;
  public tags: string[];
  public city: TaskCity;
  public status: TaskStatus;
  public creatorId: string;
  public executorId?: string;
  public comments: Comment[];
  public category: Category;
  public review: Review;
  public responses: string[];
  public responsesCount: number;
  public commentsCount: number;

  public fillEntity(task: Task) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.price = task.price;
    this.createdAt = new Date();
    this.deadline = task.deadline;
    this.picture = task.picture;
    this.address = task.address;
    this.tags = task.tags;
    this.status = task.status;
    this.creatorId = task.creatorId;
    this.comments = [];
    this.category = task.category;
    this.review = task.review;
    this.city = task.city;
    this.responses = task.responses;
    this.responsesCount = task.responsesCount;
    this.commentsCount = task.commentsCount;
  }

  constructor(task: Task) {
    this.fillEntity(task);
  }

  public toObject() {
    return {
      ...this,
      comments: [...this.comments],
      category: this.category,
      review: this.review,
      status: String(this.status),
      city: String(this.city)
    };
  }
}