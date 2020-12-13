import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { RequestDto } from './dto/request.dto';

type RequestSearchBody = RequestDto;

@Injectable()
export class RequestSearchService {
  private readonly INDEX = 'requests';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexRequest(request: RequestDto) {
    await this.elasticsearchService.index<any, RequestSearchBody>({
      index: this.INDEX,
      body: request,
    });
  }
}
