import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { TaskModule } from './task/task.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [PrismaModule, CategoryModule, TaskModule, ReviewsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
