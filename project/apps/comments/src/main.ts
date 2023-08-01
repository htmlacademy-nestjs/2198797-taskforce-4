/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { CommentModule } from './app/comment.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(CommentModule);


    const config = new DocumentBuilder()
        .setTitle('The «Comments» service')
        .setDescription('Comments service API')
        .setVersion('1.0')
        .build();


    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3000;

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('spec', app, document);

    await app.listen(port);
    Logger.log(
        `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
    );
}

bootstrap();
