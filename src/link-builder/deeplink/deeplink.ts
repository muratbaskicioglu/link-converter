import { WebURL } from '../web-url/web-url';

export abstract class Deeplink extends URL {
  static readonly DEEPLINK_PROTOCOLS = ['ty:'];

  abstract toWebURL(): WebURL;
}
