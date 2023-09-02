import { HttpService } from '@nestjs/axios';
import {BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import { ApplicationServiceURL } from '../app.config';
import { TaskStatus } from '@project/shared/app-types';


@Injectable()
export class ReviewPermisionInterseptor implements NestInterceptor {
  constructor(
    private readonly httpService: HttpService,
  ) {}
  
  public async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/${request.params.id}`);
    if(data.status !== TaskStatus.Done){
      throw new BadRequestException("You can leave review for a task with status Done");
    }
    const fromRequest = request.user.sub.toString();
    const fromData = data.creatorId.toString();
    if(fromRequest != fromData){
      throw new BadRequestException("permission denied")
    }
    return next.handle();
  }
}