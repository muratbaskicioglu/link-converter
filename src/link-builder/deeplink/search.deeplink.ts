import { Deeplink } from './deeplink';
import { createQueryString } from '../create-query-string';
import { SearchWebURL } from '../web-url/search.web-url';

export type SearchDeeplinkParams = {
  Query: string;
};

export class SearchDeeplink extends Deeplink {
  static readonly PAGE = 'Search';

  constructor(private params: SearchDeeplinkParams) {
    super(`${Deeplink.DEEPLINK_PROTOCOLS[0]}//`);

    const { Query } = params;

    this.search = createQueryString({
      Page: SearchDeeplink.PAGE,
      Query,
    });
  }

  toWebURL(): SearchWebURL {
    return new SearchWebURL({
      q: this.params.Query,
    });
  }
}
