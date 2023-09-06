import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from '../app.config';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
  ) { }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/${request.params.id}`);
    const fromRequest = request.user.sub.toString();
    const fromData = data.creatorId.toString();
    if (fromRequest != fromData) {
      throw new ForbiddenException("permission denied");
    }
    return true;
  }
}