import { createQueryString, QueryParams } from '../utilities';
import { Deeplink } from './deeplink';
import { HomeDeeplink } from './home.deeplink';
import { HomeWebURL } from '../web-url/home.web-url';

describe('ProductDeepLink', () => {
  const deeplinkQueryParams: QueryParams = {
    Page: HomeDeeplink.PAGE,
  };
  const homeDeeplink = new HomeDeeplink();

  it('should return correct url', () => {
    expect(new HomeDeeplink().toString()).toBe(
      `${Deeplink.DEEPLINK_PROTOCOLS[0]}//${createQueryString(
        deeplinkQueryParams,
      )}`,
    );
  });

  it('should have toWebURL method', () => {
    expect(homeDeeplink.toWebURL()).toBeDefined();
  });

  it('should convert to HomeWebURL correctly', () => {
    expect(homeDeeplink.toWebURL()).toBeInstanceOf(HomeWebURL);
  });

  it('should return correct HomeWebURL link', () => {
    expect(homeDeeplink.toWebURL().pathname).toBe('/');
  });
});
