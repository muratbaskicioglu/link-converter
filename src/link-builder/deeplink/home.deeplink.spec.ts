import { createQueryString, QueryParams } from '../utilities';
import { Deeplink } from './deeplink';
import { HomeDeeplink } from './home.deeplink';

describe('ProductDeepLink', () => {
  const deeplinkQueryParams: QueryParams = {
    Page: HomeDeeplink.PAGE,
  };

  it('should return correct url', () => {
    expect(new HomeDeeplink().toString()).toBe(
      `${Deeplink.DEEPLINK_PROTOCOLS[0]}//${createQueryString(
        deeplinkQueryParams,
      )}`,
    );
  });
});
