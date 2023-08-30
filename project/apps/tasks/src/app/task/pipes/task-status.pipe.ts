import { PipeTransform, Injectable, BadRequestException} from '@nestjs/common';
import { UpdateTaskStatusDto} from '../dto/update-task-status.dto';
import { TaskService } from '../task.service';
import { TaskStatus } from '@project/shared/app-types';

@Injectable()
export class TaskStatusPipe implements PipeTransform {

  constructor(private readonly taskService: TaskService) { }

  async transform(value: UpdateTaskStatusDto) {
      const task = await this.taskService.getTask(value.id)
      if((value.status === TaskStatus.Rejected || value.status === TaskStatus.InWork) && task.status !== TaskStatus.New){     
        throw new BadRequestException('You can not set status Rejected/InWork for this task ');
      }
      if((value.status === TaskStatus.Done || value.status === TaskStatus.Failure) && task.status !== TaskStatus.InWork ){     
        throw new BadRequestException('You can not set status Done/Failure for this task ');
      }
      if(value.status ===  TaskStatus.New){     
        throw new BadRequestException('You can not set status New for task');
      }
    return value;
  }
}