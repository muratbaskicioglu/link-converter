import { Parser } from './parser.interface';
import { SearchDeeplink, SearchDeeplinkParams } from '../deeplink/search.deeplink';

export class SearchDeeplinkParser implements Parser {
  constructor(private readonly url: URL) {}

  canParse(): boolean {
    const { searchParams } = this.url;
    const Page = this.nullishAndFalsyToUndefined<string>(
      searchParams.get('Page'),
    );
    const Query = this.nullishAndFalsyToUndefined<string>(
      searchParams.get('Query'),
    );

    return Page === SearchDeeplink.PAGE && !!Query;
  }

  parse<SearchDeeplinkParams>(): any {
    const { searchParams } = this.url;
    const Query = this.nullishAndFalsyToUndefined<string>(
      searchParams.get('Query'),
    );

    return { Query };
  }

  /**
   * To not set nullish and falsy values into query string.
   */
  nullishAndFalsyToUndefined<T>(value: T): T | undefined {
    return value ? value : undefined;
  }
}
