import { createQueryString, QueryParams } from '../create-query-string';
import { Deeplink } from '../deeplink/deeplink';
import { SearchDeeplink } from '../deeplink/search.deeplink';
import { SearchWebURL } from './search.web-url';

describe('SearchWebURL', () => {
  const origin = 'https://trendyol.com';
  const q = 'testQuery';
  const queryParams: QueryParams = {
    q,
  };
  const deeplinkQueryParams: QueryParams = {
    Page: SearchDeeplink.PAGE,
    Query: q,
  };
  const searchWebURL = new SearchWebURL({ q });

  it('should return correct url', () => {
    expect(searchWebURL.toString()).toBe(
      `${origin}/${SearchWebURL.SEARCH_PATH}${createQueryString(queryParams)}`,
    );
  });

  it('should convert to SearchDeepLink correctly', () => {
    expect(searchWebURL.toDeeplink()).toBeInstanceOf(SearchDeeplink);
  });

  it('should convert to correct ProductDeeplink url', () => {
    expect(searchWebURL.toDeeplink().toString()).toBe(
      `${Deeplink.DEEPLINK_PROTOCOLS[0]}//${createQueryString(
        deeplinkQueryParams,
      )}`,
    );
  });
});
