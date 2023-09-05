import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';


import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { CategoryModule } from '../category/category.module';
import { NotifyModule } from '../notify/notify.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [CategoryModule, NotifyModule, UserModule],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  exports: [TaskService, TaskRepository],
})
export class TaskModule {}
