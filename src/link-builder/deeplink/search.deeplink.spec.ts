import { createQueryString, QueryParams } from '../utilities';
import { Deeplink } from './deeplink';
import { SearchDeeplink } from './search.deeplink';

describe('SearchDeepLink', () => {
  const Query = 'testQuery';
  const deeplinkQueryParams: QueryParams = {
    Page: SearchDeeplink.PAGE,
    Query,
  };

  it('should return correct url', () => {
    expect(new SearchDeeplink({ Query }).toString()).toBe(
      `${Deeplink.DEEPLINK_PROTOCOLS[0]}//${createQueryString(
        deeplinkQueryParams,
      )}`,
    );
  });
});
