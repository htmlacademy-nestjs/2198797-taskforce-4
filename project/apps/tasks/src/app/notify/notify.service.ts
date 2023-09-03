import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { rabbitConfig } from '@project/config/config-users';
import { ConfigType } from '@nestjs/config';
import { RabbitRouting } from '@project/shared/app-types';
import { CreateNewTaskDto } from './dto/crete-new-task.dto';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async addNewTask(dto: CreateNewTaskDto) {
    return this.rabbitClient.publish<CreateNewTaskDto>(
      this.rabbiOptions.exchange,
      RabbitRouting.AddNewTask,
      { ...dto }
    );
  }
}
