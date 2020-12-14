import { Inject, Injectable } from '@nestjs/common';
import { RequestDto } from './dto/request.dto';
import { ElasticsearchService } from './elasticsearch-service.interface';

@Injectable()
export class LoggerService {
  constructor(
    @Inject('REQUEST_ELASTICSEARCH_SERVICE')
    private readonly requestSearchService: ElasticsearchService,
  ) {}

  request(
    method: string,
    url: string,
    userAgent: string,
    ip: string,
    statusCode: number,
  ) {
    const requestDTO = new RequestDto(method, url, userAgent, ip, statusCode);

    this.requestSearchService.indexRequest(requestDTO);
  }
}
