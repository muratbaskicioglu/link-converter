import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { RequestDto } from '../app/dto/request.dto';
import { Elasticsearch } from '../app/elasticsearch.interface';

type RequestSearchBody = RequestDto;

@Injectable()
export class RequestSearchService implements Elasticsearch {
  private readonly INDEX = 'requests';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexRequest(request: RequestDto) {
    await this.elasticsearchService.index<any, RequestSearchBody>({
      index: this.INDEX,
      body: request,
    });
  }
}
