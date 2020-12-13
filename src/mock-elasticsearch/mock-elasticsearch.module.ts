import { Module } from '@nestjs/common';
import { MockElasticsearchService } from './mock-elasticsearch.service';

@Module({
  providers: [
    {
      provide: 'REQUEST_ELASTIC_SEARCH_SERVICE',
      useClass: MockElasticsearchService,
    },
  ],
  exports: ['REQUEST_ELASTIC_SEARCH_SERVICE'],
})
export class MockElasticsearchModule {}
