import { Module } from '@nestjs/common';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskMemoryRepository } from './task-memory.repository';

@Module({
    imports: [],
    controllers: [TaskController],
    providers: [TaskService, TaskMemoryRepository],
})
export class TaskModule { }
