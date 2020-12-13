import { Injectable } from '@nestjs/common';
import { LinkBuilderService } from '../link-builder/link-builder.service';
import { AppModule } from './app.module';
import { HealthResponseDto } from './dto/health-response.dto';
import { InvalidURLException } from './exception/invalid-url.exception';
import { WebURL } from '../link-builder/web-url/web-url';
import { NotWebURLProvidedException } from './exception/not-web-url-provided.exception';
import { Deeplink } from '../link-builder/deeplink/deeplink';
import { NotDeeplinkProvidedException } from './exception/not-deeplink-provided.exception';

@Injectable()
export class AppService {
  constructor(private readonly linkBuilderService: LinkBuilderService) {}

  getHello(): string {
    return AppModule.description;
  }

  getHealth(): HealthResponseDto {
    return {
      status: 'Available',
      time: Date.now(),
    };
  }

  convertWebURLToDeeplink(webURL: string): string {
    let webURLInstance;

    try {
      webURLInstance = this.linkBuilderService.buildFor(webURL);
    } catch (error) {
      throw new InvalidURLException();
    }

    if (!(webURLInstance instanceof WebURL)) {
      throw new NotWebURLProvidedException();
    }

    return webURLInstance.toDeeplink().toString();
  }

  convertDeeplinkToWebURL(deeplink: string): string {
    let deeplinkInstance;

    try {
      deeplinkInstance = this.linkBuilderService.buildFor(deeplink);
    } catch (error) {
      throw new InvalidURLException();
    }

    if (!(deeplinkInstance instanceof Deeplink)) {
      throw new NotDeeplinkProvidedException();
    }

    return deeplinkInstance.toWebURL().toString();
  }
}
