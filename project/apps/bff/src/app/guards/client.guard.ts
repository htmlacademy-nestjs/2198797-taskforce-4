import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UserRole } from '@project/shared/app-types';

@Injectable()
export class ClientGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if(request.user.role != UserRole.Client){
      throw new ForbiddenException("Only for users with a Client role");
    }

    return true;
  }
}