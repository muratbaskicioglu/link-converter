import { Parser } from './parser.interface';
import {
  ProductDeeplink,
  ProductDeeplinkParams,
} from '../deeplink/product.deeplink';

export class ProductDeeplinkParser implements Parser {
  constructor(private readonly url: URL) {}

  canParse(): boolean {
    const { searchParams } = this.url;
    const Page = this.nullishAndFalsyToUndefined<string>(
      searchParams.get('Page'),
    );
    const ContentId = this.nullishAndFalsyToUndefined<string>(
      searchParams.get('ContentId'),
    );

    return Page === ProductDeeplink.PAGE && !!ContentId;
  }

  parse<ProductDeeplinkParams>(): any {
    const { searchParams } = this.url;
    const ContentId = this.nullishAndFalsyToUndefined<string>(
      searchParams.get('ContentId'),
    );
    const CampaignId = this.nullishAndFalsyToUndefined<string>(
      searchParams.get('CampaignId'),
    );
    const MerchantId = this.nullishAndFalsyToUndefined<string>(
      searchParams.get('MerchantId'),
    );

    return {
      ContentId,
      CampaignId,
      MerchantId,
    };
  }

  /**
   * To not set nullish and falsy values into query string.
   */
  nullishAndFalsyToUndefined<T>(value: T): T | undefined {
    return value ? value : undefined;
  }
}