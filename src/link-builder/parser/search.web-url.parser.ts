import { Parser } from './parser.interface';
import { SearchWebURL } from '../web-url/search.web-url';

export class SearchWebURLParser implements Parser<SearchWebURL> {
  constructor(private readonly url: URL) {}

  canParse(): boolean {
    return this.url.pathname === `/${SearchWebURL.SEARCH_PATH}`;
  }

  parse(): SearchWebURL {
    const { searchParams } = this.url;
    const q = this.nullishAndFalsyToUndefined<string>(searchParams.get('q'));

    return new SearchWebURL({ q });
  }

  /**
   * To not set nullish and falsy values into query string.
   */
  nullishAndFalsyToUndefined<T>(value: T): T | undefined {
    return value ? value : undefined;
  }
}
