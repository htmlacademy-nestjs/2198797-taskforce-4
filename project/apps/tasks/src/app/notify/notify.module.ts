import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/util/util-core';
import { NotifyService } from './notify.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('rabbit.notify')
    )
  ],
  providers: [NotifyService],
  exports: [NotifyService]
})
export class NotifyModule { }
