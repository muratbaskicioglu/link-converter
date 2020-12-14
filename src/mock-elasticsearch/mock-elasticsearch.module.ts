import { Module } from '@nestjs/common';
import { MockElasticsearchService } from './mock.elasticsearch-service';

@Module({
  providers: [
    {
      provide: 'REQUEST_ELASTICSEARCH_SERVICE',
      useClass: MockElasticsearchService,
    },
  ],
  exports: ['REQUEST_ELASTICSEARCH_SERVICE'],
})
export class MockElasticsearchModule {}
