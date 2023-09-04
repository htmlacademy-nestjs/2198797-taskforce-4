import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';


import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { CategoryModule } from '../category/category.module';
import { NotifyModule } from '../notify/notify.module';

@Module({
  imports: [CategoryModule, NotifyModule],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  exports: [TaskService],
})
export class TaskModule {}
