import { AbstractHttpAdapter, NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

export async function createApp<T>(
  httpAdapter?: AbstractHttpAdapter,
): Promise<T | INestApplication> {
  let app: INestApplication;

  if (httpAdapter) {
    app = await NestFactory.create(AppModule, httpAdapter);
  } else {
    app = await NestFactory.create(AppModule);
  }

  const options = new DocumentBuilder()
    .setTitle('Link Converter API')
    .setDescription(
      'The API provides to convert links to another type of links.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('documentation', app, document);

  return app;
}

async function bootstrap() {
  const app = await createApp<NestFastifyApplication>(new FastifyAdapter());
  const configService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
