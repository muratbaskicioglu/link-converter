import { WebURL } from './web-url';
import { Deeplink } from '../deeplink/deeplink';
import { HomeDeeplink } from '../deeplink/home.deeplink';

export class HomeWebURL extends WebURL {
  constructor(url?: string) {
    super(url || `https://trendyol.com`);
  }

  toDeeplink(): Deeplink {
    return new HomeDeeplink();
  }
}
