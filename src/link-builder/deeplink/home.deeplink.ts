import { Deeplink } from './deeplink';

export class HomeDeeplink extends Deeplink {
  static readonly PAGE = 'Home';

  constructor() {
    super(`${Deeplink.DEEPLINK_PROTOCOLS[0]}//?Page=${HomeDeeplink.PAGE}`);
  }
}
