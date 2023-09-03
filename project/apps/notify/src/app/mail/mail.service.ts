import { Subscriber } from '@project/shared/app-types';
import { Inject, Injectable } from '@nestjs/common';
import { EMAIL_ADD_SUBSCRIBER_SUBJECT, CREATE_NEW_TASK_SUBJECT } from './mail.constant';
import { MailerService } from '@nestjs-modules/mailer';
import { notifyConfig } from '@project/config/config-notify';
import { ConfigType } from '@nestjs/config';
import { CreateNewTaskDto } from '../email-subscriber/dto/create-new-task.dto';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,

    @Inject(notifyConfig.KEY)
    private readonly serviceConfig: ConfigType<typeof notifyConfig>,
  ) { }

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.serviceConfig.mail.from,
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.firstname} ${subscriber.lastname}`,
        email: `${subscriber.email}`,
      }
    })
  }

  public async sendNotifyNewTask(task: CreateNewTaskDto, subscribers: Subscriber[]) {
    for (const subscriber of subscribers) {
      if (subscriber.email) {
        await this.mailerService.sendMail({
          from: this.serviceConfig.mail.from,
          to: subscriber.email,
          subject: CREATE_NEW_TASK_SUBJECT,
          template: './new-task',
          context: {
            user: `${subscriber.firstname} ${subscriber.lastname}`,
            title: `${task.title}`,
            description: `${task.description}`,
            city: `${task.city}`
          }
        })
      }
    }
  }
}
