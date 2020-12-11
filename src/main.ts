import { AbstractHttpAdapter, NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
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

  return app;
}

async function bootstrap() {
  const app = await createApp<NestFastifyApplication>(new FastifyAdapter());
  await app.listen(3000);
}
bootstrap();
