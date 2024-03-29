import { createQueryString } from '../create-query-string';
import { SearchDeeplink } from '../deeplink/search.deeplink';
import { SearchDeeplinkParser } from './search.deeplink.parser';
import { Deeplink } from '../deeplink/deeplink';

describe('SearchDeeplinkParser', () => {
  const Query = 'testQuery';
  const queryParams = {
    Page: SearchDeeplink.PAGE,
    Query,
  };
  let url, parser;

  beforeEach(() => {
    url = new URL(`${Deeplink.DEEPLINK_PROTOCOLS[0]}//`);
    url.search = createQueryString(queryParams);
    parser = new SearchDeeplinkParser(url);
  });

  it('should valid for parsing', () => {
    expect(parser.canParse()).toBe(true);
  });

  it('should invalid for parsing', () => {
    delete queryParams.Page;
    url.search = createQueryString(queryParams);

    expect(parser.canParse()).toBe(false);
  });

  it('should parse correctly', () => {
    expect(parser.parse()).toEqual(new SearchDeeplink({ Query }));
  });
});
