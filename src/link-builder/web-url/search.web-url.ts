import { WebURL } from './web-url';
import { Deeplink } from '../deeplink/deeplink';
import { createQueryString } from '../utilities';
import { SearchDeeplink } from '../deeplink/search.deeplink';

export type SearchWebURLParams = {
  q: string,
};

export class SearchWebURL extends WebURL {
  static SEARCH_PATH = 'tum--urunler';

  constructor(private readonly params: SearchWebURLParams) {
    super(`https://trendyol.com/${SearchWebURL.SEARCH_PATH}`);

    const { q } = params;

    this.search = createQueryString({ q });
  }

  toDeeplink(): Deeplink {
    return new SearchDeeplink({
      Query: this.params.q,
    });
  }
}
