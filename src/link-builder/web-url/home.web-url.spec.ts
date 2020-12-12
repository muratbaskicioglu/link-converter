import { HomeWebURL } from './home.web-url';
import { HomeDeeplink } from '../deeplink/home.deeplink';
import { Deeplink } from '../deeplink/deeplink';
import { createQueryString } from '../utilities';

describe('HomeWebURL', () => {
  const origin = 'https://trendyol.com';
  const homeWebURL = new HomeWebURL(origin);
  const deeplinkQueryParams = {
    Page: HomeDeeplink.PAGE,
  };

  it('should convert to HomeDeeplink correctly', () => {
    expect(homeWebURL.toDeeplink()).toBeInstanceOf(HomeDeeplink);
  });

  it('should convert to correct HomeDeeplink url', () => {
    expect(homeWebURL.toDeeplink().toString()).toBe(
      `${Deeplink.DEEPLINK_PROTOCOLS[0]}//${createQueryString(
        deeplinkQueryParams,
      )}`,
    );
  });
});
