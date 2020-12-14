import { createQueryString, QueryParams } from '../create-query-string';
import { Deeplink } from './deeplink';
import { ProductDeeplink } from './product.deeplink';
import { ProductWebURL } from '../web-url/product.web-url';

describe('ProductDeepLink', () => {
  const origin = 'https://trendyol.com';
  const ContentId = 'testProductId';
  const CampaignId = 'testBoutiqueId';
  const MerchantId = 'testMerchantId';
  const deeplinkQueryParams: QueryParams = {
    Page: ProductDeeplink.PAGE,
    ContentId,
    CampaignId,
    MerchantId,
  };
  const productDeeplink = new ProductDeeplink({
    ContentId,
    CampaignId,
    MerchantId,
  });

  it('should return correct url', () => {
    expect(
      new ProductDeeplink({
        ContentId,
        CampaignId,
        MerchantId,
      }).toString(),
    ).toBe(
      `${Deeplink.DEEPLINK_PROTOCOLS[0]}//${createQueryString(
        deeplinkQueryParams,
      )}`,
    );
  });

  it('should have toWebURL method', () => {
    expect(productDeeplink.toWebURL).toBeDefined();
  });

  it('should convert to ProductWebURL correctly', () => {
    expect(productDeeplink.toWebURL()).toBeInstanceOf(ProductWebURL);
  });

  it('should convert to correct ProductDeeplink url', () => {
    expect(productDeeplink.toWebURL().toString()).toBe(
      `${origin}/brand/name${
        ProductWebURL.PRODUCT_PATH_SEPARATOR
      }${ContentId}${createQueryString({
        boutiqueId: CampaignId,
        merchantId: MerchantId,
      })}`,
    );
  });
});
