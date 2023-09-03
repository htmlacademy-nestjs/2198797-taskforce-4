import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import rabbitConfg from './rabbit.config';

const ENV_TASKS_FILE_PATH = 'apps/tasks/.tasks.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [rabbitConfg],
      envFilePath: ENV_TASKS_FILE_PATH
    }),
  ]
})
export class ConfigTasksModule { }