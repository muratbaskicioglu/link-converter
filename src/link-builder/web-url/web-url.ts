import { Deeplink } from '../deeplink/deeplink';

export abstract class WebURL extends URL {
  static readonly WEB_URL_PROTOCOLS = ['http:', 'https:'];

  abstract toDeeplink(): Deeplink;
}
