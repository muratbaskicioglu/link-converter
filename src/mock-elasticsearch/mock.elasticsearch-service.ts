import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '../app/elasticsearch-service.interface';
import { RequestDto } from '../app/dto/request.dto';

@Injectable()
export class MockElasticsearchService implements ElasticsearchService {
  indexRequest(request: RequestDto) {}
}
