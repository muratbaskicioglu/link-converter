import { Injectable } from '@nestjs/common';
import { WebURL } from './web-url/web-url';
import { ProductWebURLParser } from './parser/product.web-url.parser';
import { HomeWebURL } from './web-url/home.web-url';
import { SearchWebURLParser } from './parser/search.web-url.parser';
import { Deeplink } from './deeplink/deeplink';
import { ProductDeeplinkParser } from './parser/product.deeplink.parser';
import { HomeDeeplink } from './deeplink/home.deeplink';
import { SearchDeeplinkParser } from './parser/search.deeplink.parser';

@Injectable()
export class LinkBuilderService {
  buildFor(url: string) {
    const URLParams = new URL(url);
    const WEB_URL_PARSERS = [
      new ProductWebURLParser(URLParams),
      new SearchWebURLParser(URLParams),
    ];
    const DEEPLINK_PARSERS = [
      new ProductDeeplinkParser(URLParams),
      new SearchDeeplinkParser(URLParams),
    ];

    if (WebURL.WEB_URL_PROTOCOLS.includes(URLParams.protocol)) {
      for (const parser of WEB_URL_PARSERS) {
        if (parser.canParse()) {
          return parser.parse();
        }
      }

      return new HomeWebURL(url);
    }

    if (Deeplink.DEEPLINK_PROTOCOLS.includes(URLParams.protocol)) {
      for (const parser of DEEPLINK_PARSERS) {
        if (parser.canParse()) {
          return parser.parse();
        }
      }

      return new HomeDeeplink();
    }
  }
}
