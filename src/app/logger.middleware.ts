import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  use(request: Request, response: Response, next: Function): void {
    const { ip, method, url } = request;
    const userAgent = request.headers['user-agent'] || 'unknown';

    response.on('close', () => {
      const { statusCode } = response;

      this.loggerService.request(method, url, userAgent, ip, statusCode);
    });

    next();
  }
}
