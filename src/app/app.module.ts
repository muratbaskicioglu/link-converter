import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('web-url-to-deeplink');
  }
}
