import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database/database.module';
import { LinkBuilderModule } from '../link-builder/link-builder.module';
import { LoggerMiddleware } from './logger.middleware';
import { RequestSearchService } from './request-search.service';
import { LoggerService } from './logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env'],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().default('development'),
        PORT: Joi.number().default(3000),
        ELASTICSEARCH_NODE: Joi.string().default('http://localhost:9200'),
        ELASTICSEARCH_USERNAME: Joi.string().default('elastic'),
        ELASTICSEARCH_PASSWORD: Joi.string().default('admin'),
        LOG_STORING_ENABLED: Joi.boolean().default(false),
      }),
    }),
    DatabaseModule,
    LinkBuilderModule,
  ],
  controllers: [AppController],
  providers: [AppService, RequestSearchService, LoggerService],
})
export class AppModule {
  static description = `
    Hello, the API provides to convert links to another type of links.
    See the documentation page for more information.
    - by Murat Baskıcıoğlu
  `;

  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('web-url-to-deeplink', 'deeplink-to-web-url');
  }
}
