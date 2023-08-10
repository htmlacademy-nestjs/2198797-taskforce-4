import { ReviewEntity } from "./review.entity";
import { Review } from "@project/shared/app-types";
import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewRepository implements CRUDRepository<ReviewEntity, number, Review> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: ReviewEntity): Promise<Review> {
    return this.prisma.review.create({
      data: { ...item.toObject() }
    });
  }

  public async destroy(reviewId: number): Promise<void> {
    await this.prisma.review.delete({
      where: {
        reviewId,
      }
    });
  }

  public findById(reviewId: number): Promise<Review | null> {
    return this.prisma.review.findFirst({
      where: {
        reviewId
      }
    });
  }

  public find(): Promise<Review[]> {
    return this.prisma.review.findMany();
  }

  public update(reviewId: number, item: ReviewEntity): Promise<Review> {
    return this.prisma.review.update({
      where: {
        reviewId
      },
      data: { ...item.toObject(), reviewId }
    });
  }
}
