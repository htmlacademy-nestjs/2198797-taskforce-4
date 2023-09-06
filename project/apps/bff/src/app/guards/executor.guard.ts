import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { UserRole } from '@project/shared/app-types';

@Injectable()
export class ExecutorGuard implements CanActivate {

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.user.role != UserRole.Executor) {
      throw new ForbiddenException("Only for users with a Executor role");
    }

    return true;
  }
}