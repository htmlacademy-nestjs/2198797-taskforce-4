import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { TaskStatus } from '@project/shared/app-types';
import { TaskService } from '../task.service';


@Injectable()
export class TaskStatusInterceptor implements NestInterceptor {
  constructor(
    private readonly taskService: TaskService,
  ) { }

  public async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const status = request.body.status;
    const task = await this.taskService.getTask(parseInt(request.params.id))
    if ((status === TaskStatus.Rejected || status === TaskStatus.InWork) && task.status !== TaskStatus.New) {
      throw new BadRequestException('You can not set status Rejected/InWork for this task ');
    }
    if ((status === TaskStatus.Done || status === TaskStatus.Failure) && task.status !== TaskStatus.InWork) {
      throw new BadRequestException('You can not set status Done/Failure for this task ');
    }
    if (status === TaskStatus.New) {
      throw new BadRequestException('You can not set status New for task');
    }
    if (status === TaskStatus.InWork && !request.body.executorId) {
      throw new BadRequestException('You can not set status InWork without Executor ');
    }

    if (request.body.executorId) {
      const executorId = request.body.executorId;
      if (!task.responses.includes(executorId)) {
        throw new BadRequestException(`You can not use executorId=${executorId}`);
      }
    }
    return next.handle();
  }
}