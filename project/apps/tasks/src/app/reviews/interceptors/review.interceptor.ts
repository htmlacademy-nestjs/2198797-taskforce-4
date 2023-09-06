import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { TaskService } from '../../task/task.service';
import { TaskStatus } from '@project/shared/app-types';


@Injectable()
export class ReviewInterceptor implements NestInterceptor {
  constructor(
    private readonly taskService: TaskService,
  ) { }

  public async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const task = await this.taskService.getTask(parseInt(request.params.id))
    if (task.status !== TaskStatus.Done) {
      throw new BadRequestException("You can leave a review for tasks with a status Done");
    }

    return next.handle();
  }
}