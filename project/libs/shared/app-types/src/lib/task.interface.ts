import { Category } from "./category.interface";
import { Comment } from "./comment.interface";
import { Review } from "./review.interface";
import { TaskStatus } from "./task-status.enum";
import { TaskCity } from "./task-cities.enum";

export interface Task {
  id?: number;
  title: string;
  description: string;
  price?: number;
  createdAt?: Date;
  deadline: Date;
  picture?: string;
  address?: string;
  tags?: string[];
  city: TaskCity;
  status: TaskStatus;
  review?: Review;
  creatorId: string;
  executorId?: string;
  comments: Comment[];
  category: Category;
  responses?: string[];
  responsesCount?: number;
  commentsCount?: number;

}