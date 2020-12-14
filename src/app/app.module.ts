import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinkBuilderModule } from '../link-builder/link-builder.module';
import { LoggerMiddleware } from './logger.middleware';
import { LoggerService } from './logger.service';
import { ElasticsearchModule } from '../elasticsearch/elasticsearch.module';
import { MockElasticsearchModule } from '../mock-elasticsearch/mock-elasticsearch.module';

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
      }),
    }),
    LinkBuilderModule,
    process.env.LOG_STORING_ENABLED === 'true'
      ? ElasticsearchModule
      : MockElasticsearchModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {
  static description = `
    Hello, the API provides to convert links to another type of links.
    See the documentation page for more information.
    - by Murat Baskıcıoğlu
  `;

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('web-url-to-deeplink', 'deeplink-to-web-url');
  }
}
