import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiExcludeEndpoint } from '@nestjs/swagger';
import { AppService } from './app.service';
import { HealthResponseDto } from './dto/health-response.dto';

@Controller()
export class AppController {
  static Endpoint = {
    webURLToDeeplink: (webURL?: string) => {
      return `/web-url-to-deeplink${webURL ? `?url=${webURL}` : ''}`;
    },
    deeplinkToWebURL: (deeplink?: string) => {
      return `/deeplink-to-web-url${deeplink ? `?url=${deeplink}` : ''}`;
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

  @Get(AppController.Endpoint.webURLToDeeplink())
  webURLToDeeplink(@Query('url') webURL: string) {
    return this.appService.convertWebURLToDeeplink(webURL);
  }

  @Get(AppController.Endpoint.deeplinkToWebURL())
  deeplinkToWebURL(@Query('url') deeplink: string) {
    return this.appService.convertDeeplinkToWebURL(deeplink);
  }
}
