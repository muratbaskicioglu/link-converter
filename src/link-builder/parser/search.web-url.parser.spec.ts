import { createQueryString, QueryParams } from '../create-query-string';
import { SearchWebURL } from '../web-url/search.web-url';
import { SearchWebURLParser } from './search.web-url.parser';

describe('SearchWebURLParser', () => {
  const origin = 'https://trendyol.com';
  const q = 'testQuery';
  let queryParams: QueryParams;
  let url, parser;

  beforeEach(() => {
    url = new URL(origin);
    parser = new SearchWebURLParser(url);
    queryParams = { q };
  });

  it('should valid for parsing', () => {
    url.pathname = `/${SearchWebURL.SEARCH_PATH}`;

    expect(parser.canParse()).toBe(true);
  });

  it('should invalid for parsing', () => {
    url.pathname = `/invalidPath`;

    expect(parser.canParse()).toBe(false);
  });

  it('should parse correctly', () => {
    url.pathname = `/${SearchWebURL.SEARCH_PATH}`;
    url.search = createQueryString(queryParams);

    expect(parser.parse()).toEqual(new SearchWebURL({ q }));
  });
});
