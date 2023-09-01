import { Module } from '@nestjs/common';

import { TasksController } from './tasks.controller';
import { UsersController } from './users.controller';
import { HttpModule } from '@nestjs/axios';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.config';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { CommentController } from './comments.controller';
import { ReviewController } from './review.controller';


@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    })
  ],
  controllers: [
    TasksController,
    UsersController,
    CommentController,
    ReviewController
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}
