import { HttpService } from '@nestjs/axios';
import {BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import { ApplicationServiceURL } from '../app.config';
import { TaskStatus } from '@project/shared/app-types';


@Injectable()
export class StatusPermisionInterseptor implements NestInterceptor {
  constructor(
    private readonly httpService: HttpService,
  ) {}
  
  public async intercept(context: ExecutionContext, next: CallHandler) {
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
      throw new BadRequestException("permission denied")
    }
    return next.handle();
  }
}