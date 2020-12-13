import { WebURL } from './web-url';
import { Deeplink } from '../deeplink/deeplink';
import { HomeDeeplink } from '../deeplink/home.deeplink';

export class HomeWebURL extends WebURL {
  toDeeplink(): Deeplink {
    return new HomeDeeplink();
  }
}
