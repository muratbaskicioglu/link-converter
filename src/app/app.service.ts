import { Injectable } from '@nestjs/common';
import { LinkBuilderService } from '../link-builder/link-builder.service';
import { AppModule } from './app.module';
import { HealthResponseDto } from './health-response.dto';
import { InvalidURLException } from './exception/InvalidURLException';
import { WebURL } from '../link-builder/web-url/web-url';
import { NotWebURLProvidedException } from './exception/NotWebURLProvidedException';

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
}
