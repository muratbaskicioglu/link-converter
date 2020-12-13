import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiExcludeEndpoint } from '@nestjs/swagger';
import { AppService } from './app.service';
import { HealthResponseDto } from './dto/health-response.dto';

@Controller()
export class AppController {
  static Endpoint = {
    webURLToDeeplink: (webURL?: string) => {
      return `/web-url-to-deeplink?url=${webURL || ':webURL'}`;
    },
  };

  constructor(private readonly appService: AppService) {}

  @ApiExcludeEndpoint()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOkResponse({ type: HealthResponseDto })
  @Get('health')
  getHealth(): HealthResponseDto {
    return this.appService.getHealth();
  }

  @Get('web-url-to-deeplink')
  webURLToDeeplink(@Query('url') webURL: string) {
    return this.appService.convertWebURLToDeeplink(webURL);
  }
}
