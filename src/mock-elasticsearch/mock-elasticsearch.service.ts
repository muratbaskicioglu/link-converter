import { Injectable } from '@nestjs/common';
import { Elasticsearch } from '../app/elasticsearch.interface';
import { RequestDto } from '../app/dto/request.dto';

@Injectable()
export class MockElasticsearchService implements Elasticsearch {
  indexRequest(request: RequestDto) {}
}
