import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { TaskModule } from './task/task.module';
import { ReviewsModule } from './reviews/reviews.module';
import { NotifyModule } from './notify/notify.module';
import { ConfigTasksModule } from '@project/config/config-tasks';

@Module({
  imports: [
    PrismaModule,
    CategoryModule,
    TaskModule,
    ReviewsModule,
    ConfigTasksModule,
    NotifyModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
