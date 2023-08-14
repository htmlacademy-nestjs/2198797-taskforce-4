import { Category } from "./category.interface";
import { Comment } from "./comment.interface";
import { Review } from "./review.interface";

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
  city: string;
  status: string;
  review?: Review;
  creatorId: string;
  executorId?: string;
  comments: Comment[];
  category: Category;

}