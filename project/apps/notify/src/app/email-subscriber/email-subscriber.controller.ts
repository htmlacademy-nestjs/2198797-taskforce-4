import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { CreateNewTaskDto } from './dto/create-new-task.dto';
import { EmailSubscriberService } from './email-subscriber.service';
import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from '@project/shared/app-types';
import { MailService } from '../mail/mail.service';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) { }

  @RabbitSubscribe({
    exchange: 'taskforce.notify',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'taskforce.notify',
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: 'taskforce.notify',
    routingKey: RabbitRouting.AddNewTask,
    queue: 'task.notify',
  })
  public async send(task: CreateNewTaskDto) {
    const subscribers = await this.subscriberService.getSubscribers();
    this.mailService.sendNotifyNewTask(task, subscribers);
  }
}
