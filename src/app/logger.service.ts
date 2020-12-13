import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RequestDto } from './dto/request.dto';
import { Elasticsearch } from './elasticsearch.interface';

@Injectable()
export class LoggerService {
  constructor(
    @Inject('REQUEST_ELASTIC_SEARCH_SERVICE') private readonly requestSearchService: Elasticsearch,
    private readonly configService: ConfigService,
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
