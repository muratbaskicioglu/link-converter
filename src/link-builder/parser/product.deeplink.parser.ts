import { Parser } from './parser.interface';
import { ProductDeeplink } from '../deeplink/product.deeplink';

export class ProductDeeplinkParser implements Parser<ProductDeeplink> {
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

  parse(): ProductDeeplink {
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

    return new ProductDeeplink({
      ContentId,
      CampaignId,
      MerchantId,
    });
  }

  /**
   * To not set nullish and falsy values into query string.
   */
  nullishAndFalsyToUndefined<T>(value: T): T | undefined {
    return value ? value : undefined;
  }
}
