import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RequestSearchService } from './request-search.service';
import { RequestDto } from './dto/request.dto';

@Injectable()
export class LoggerService {
  constructor(
    private readonly configService: ConfigService,
    private readonly requestSearchService: RequestSearchService,
  ) {}

  request(
    method: string,
    url: string,
    userAgent: string,
    ip: string,
    statusCode: number,
  ) {
    const requestDTO = new RequestDto(method, url, userAgent, ip, statusCode);
    const logStoringEnabled = this.configService.get('LOG_STORING_ENABLED');

    if (logStoringEnabled) {
      this.requestSearchService.indexRequest(requestDTO);
    } else {
      console.log('Request: ', requestDTO);
    }
  }
}
