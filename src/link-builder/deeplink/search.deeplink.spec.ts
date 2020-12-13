import { createQueryString, QueryParams } from '../utilities';
import { Deeplink } from './deeplink';
import { SearchDeeplink } from './search.deeplink';
import { SearchWebURL } from '../web-url/search.web-url';

describe('SearchDeepLink', () => {
  const Query = 'testQuery';
  const deeplinkQueryParams: QueryParams = {
    Page: SearchDeeplink.PAGE,
    Query,
  };
  const searchDeeplink = new SearchDeeplink({
    Query,
  });

  it('should return correct url', () => {
    expect(new SearchDeeplink({ Query }).toString()).toBe(
      `${Deeplink.DEEPLINK_PROTOCOLS[0]}//${createQueryString(
        deeplinkQueryParams,
      )}`,
    );
  });

  it('should have toWebURL method', () => {
    expect(searchDeeplink.toWebURL()).toBeDefined();
  });

  it('should convert to SearchWebURL correctly', () => {
    expect(searchDeeplink.toWebURL()).toBeInstanceOf(SearchWebURL);
  });

  it('should return correct SearchWebURL link', () => {
    const webURL = searchDeeplink.toWebURL();

    expect(webURL.pathname).toBe(`/${SearchWebURL.SEARCH_PATH}`);
    expect(webURL.search).toBe(`${createQueryString({ q: Query })}`);
  });
});
