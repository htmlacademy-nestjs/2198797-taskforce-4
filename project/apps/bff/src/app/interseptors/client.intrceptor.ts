import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { UserRole } from '@project/shared/app-types';

@Injectable()
export class ClientInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    if(request.user.role != UserRole.Client){
      throw new BadRequestException("Only for users with a Client role");
    }

    return next.handle();
  }
}