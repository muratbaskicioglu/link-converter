import { createQueryString, QueryParams } from '../create-query-string';
import { Deeplink } from '../deeplink/deeplink';
import { ProductDeeplinkParser } from './product.deeplink.parser';
import { ProductDeeplink } from '../deeplink/product.deeplink';

describe('ProductDeeplinkParser', () => {
  const origin = `${Deeplink.DEEPLINK_PROTOCOLS[0]}//`;
  const Page = ProductDeeplink.PAGE;
  const ContentId = 'testProductId';
  const CampaignId = 'testBoutiqueId';
  const MerchantId = 'testMerchantId';
  let queryParams: QueryParams;
  let url, parser;

  beforeEach(() => {
    url = new URL(origin);
    parser = new ProductDeeplinkParser(url);
    queryParams = {
      Page,
      ContentId,
      CampaignId,
      MerchantId,
    };
  });

  it('should valid for parsing', () => {
    url.search = createQueryString(queryParams);

    expect(parser.canParse()).toBe(true);
  });

  it('should invalid for parsing', () => {
    expect(parser.canParse()).toBe(false);
  });

  it('should parse correctly', () => {
    url.search = createQueryString(queryParams);

    expect(parser.parse()).toEqual(
      new ProductDeeplink({
        ContentId,
        CampaignId,
        MerchantId,
      }),
    );
  });

  it('should parse correctly without optional parameters', () => {
    delete queryParams.MerchantId;
    url.search = createQueryString(queryParams);

    expect(parser.parse()).toEqual(
      new ProductDeeplink({
        ContentId,
        CampaignId,
      }),
    );
  });
});
