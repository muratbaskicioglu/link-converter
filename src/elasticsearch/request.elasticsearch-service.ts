import { Injectable } from '@nestjs/common';
import { ElasticsearchService as NestElasticsearchService } from '@nestjs/elasticsearch';
import { RequestDto } from '../app/dto/request.dto';
import { ElasticsearchService } from '../app/elasticsearch-service.interface';

type RequestSearchBody = RequestDto;

@Injectable()
export class RequestElasticsearchService implements ElasticsearchService {
  private readonly INDEX = 'requests';

  constructor(
    private readonly elasticsearchService: NestElasticsearchService,
  ) {}

  async indexRequest(request: RequestDto) {
    await this.elasticsearchService.index<any, RequestSearchBody>({
      index: this.INDEX,
      body: request,
    });
  }
}
