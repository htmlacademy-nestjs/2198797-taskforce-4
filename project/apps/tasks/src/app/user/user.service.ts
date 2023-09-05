import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { rabbitConfig } from '@project/config/config-tasks';
import { ConfigType } from '@nestjs/config';
import { RabbitRouting } from '@project/shared/app-types';
import { UserRatingDto } from './dto/user-rating.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async updateUserRating(dto: UserRatingDto) {
    return this.rabbitClient.publish<UserRatingDto>(
      this.rabbiOptions.notify.exchange,
      RabbitRouting.UpdateUserRating,
      { ...dto }
    );
  }
}