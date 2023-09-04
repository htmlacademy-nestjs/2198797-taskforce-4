/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { RequestIdInterceptor } from './app/interseptors/request-id.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
  .setTitle('The «BFF» service')
  .setDescription('BFF service API')
  .setVersion('1.0')
  .build();
  
  app.useGlobalInterceptors(new RequestIdInterceptor());
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);
  
  const port = process.env.PORT || 3002;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
