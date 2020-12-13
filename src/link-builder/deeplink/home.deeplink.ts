import { Deeplink } from './deeplink';
import { HomeWebURL } from '../web-url/home.web-url';

export class HomeDeeplink extends Deeplink {
  static readonly PAGE = 'Home';

  constructor() {
    super(`${Deeplink.DEEPLINK_PROTOCOLS[0]}//?Page=${HomeDeeplink.PAGE}`);
  }

  toWebURL(): HomeWebURL {
    return new HomeWebURL();
  }
}
