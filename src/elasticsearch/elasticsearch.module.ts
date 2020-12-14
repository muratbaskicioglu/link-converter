import { Module } from '@nestjs/common';
import { RequestSearchService } from './request-search.service';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchModule as NestElasticsearchModule } from '@nestjs/elasticsearch';

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
      provide: 'REQUEST_ELASTIC_SEARCH_SERVICE',
      useClass: RequestSearchService,
    },
  ],
  exports: ['REQUEST_ELASTIC_SEARCH_SERVICE'],
})
export class ElasticsearchModule {}
