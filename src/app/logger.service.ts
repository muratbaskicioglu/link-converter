import { Injectable } from '@nestjs/common';
import { RequestSearchService } from './request-search.service';
import { RequestDto } from './dto/request.dto';

@Injectable()
export class LoggerService {
  constructor(private readonly requestSearchService: RequestSearchService) {}

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
