import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from '../app.config';
import { TaskStatus } from '@project/shared/app-types';

@Injectable()
export class StatusPermissionGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/${request.params.id}`);
    const fromRequest = request.user.sub.toString();
    let fromData;
    if(request.body.status === TaskStatus.Failure){
      fromData = data.executorId.toString();
    } else{
      fromData = data.creatorId.toString();
    }
    if(fromRequest != fromData){
      throw new ForbiddenException("permission denied")
    }
    return true;
  }
}