import { Parser } from './parser.interface';
import { SearchWebURL, SearchWebURLParams } from '../web-url/search.web-url';

export class SearchWebURLParser implements Parser {
  constructor(private readonly url: URL) {}

  canParse(): boolean {
    return this.url.pathname === `/${SearchWebURL.SEARCH_PATH}`;
  }

  parse<SearchWebURLParams>(): any {
    const { searchParams } = this.url;
    const q = this.nullishAndFalsyToUndefined<string>(searchParams.get('q'));

    return { q };
  }

  /**
   * To not set nullish and falsy values into query string.
   */
  nullishAndFalsyToUndefined<T>(value: T): T | undefined {
    return value ? value : undefined;
  }
}
