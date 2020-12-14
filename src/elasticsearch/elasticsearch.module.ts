import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ElasticsearchModule as NestElasticsearchModule,
  ElasticsearchService as NestElasticsearchService,
} from '@nestjs/elasticsearch';
import { RequestElasticsearchService } from './request.elasticsearch-service';

@Module({
  imports: [
    NestElasticsearchModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'),
        auth: {
          username: configService.get('ELASTICSEARCH_USERNAME'),
          password: configService.get('ELASTICSEARCH_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: 'REQUEST_ELASTICSEARCH_SERVICE',
      useClass: RequestElasticsearchService,
    },
  ],
  exports: ['REQUEST_ELASTICSEARCH_SERVICE'],
})
export class ElasticsearchModule {}
