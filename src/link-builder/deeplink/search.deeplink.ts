import { Deeplink } from './deeplink';
import { createQueryString } from '../utilities';

export type SearchDeeplinkParams = {
  Query: string;
};

export class SearchDeeplink extends Deeplink {
  static readonly PAGE = 'Search';

  constructor(params: SearchDeeplinkParams) {
    super(`${Deeplink.DEEPLINK_PROTOCOLS[0]}//`);

    const { Query } = params;

    this.search = createQueryString({
      Page: SearchDeeplink.PAGE,
      Query,
    });
  }
}
