import { Injectable } from '@nestjs/common';
import { WebURL } from './web-url/web-url';
import { ProductWebURL } from './web-url/product.web-url';
import { ProductWebURLParser } from './parser/product.web-url.parser';
import { HomeWebURL } from './web-url/home.web-url';
import { SearchWebURLParser } from './parser/search.web-url.parser';
import { SearchWebURL } from './web-url/search.web-url';
import { ProductDeeplink } from './deeplink/product.deeplink';
import { SearchDeeplink } from './deeplink/search.deeplink';
import { Deeplink } from './deeplink/deeplink';
import { ProductDeeplinkParser } from './parser/product.deeplink.parser';
import { HomeDeeplink } from './deeplink/home.deeplink';
import { SearchDeeplinkParser } from './parser/search.deeplink.parser';

@Injectable()
export class LinkBuilderService {
  buildFor(url: string) {
    const URLParams = new URL(url);

    const WEB_URL_TYPES = [
      {
        Parser: ProductWebURLParser,
        Link: ProductWebURL,
      },
      {
        Parser: SearchWebURLParser,
        Link: SearchWebURL,
      },
    ];

    const DEEPLINK_TYPES = [
      {
        Parser: ProductDeeplinkParser,
        Link: ProductDeeplink,
      },
      {
        Parser: SearchDeeplinkParser,
        Link: SearchDeeplink,
      },
    ];

    if (WebURL.WEB_URL_PROTOCOLS.includes(URLParams.protocol)) {
      for (const { Parser, Link } of WEB_URL_TYPES) {
        const parser = new Parser(URLParams);

        if (parser.canParse()) {
          const options = parser.parse();

          return new Link(options);
        }
      }

      return new HomeWebURL(url);
    }

    if (Deeplink.DEEPLINK_PROTOCOLS.includes(URLParams.protocol)) {
      for (const { Parser, Link } of DEEPLINK_TYPES) {
        const parser = new Parser(URLParams);

        if (parser.canParse()) {
          const options = parser.parse();

          return new Link(options);
        }
      }

      return new HomeDeeplink();
    }
  }
}
