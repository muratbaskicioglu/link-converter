import { createQueryString, QueryParams } from '../utilities';
import { Deeplink } from './deeplink';
import { ProductDeeplink } from './product.deeplink';

describe('ProductDeepLink', () => {
  const ContentId = 'testProductId';
  const CampaignId = 'testBoutiqueId';
  const MerchantId = 'testMerchantId';
  const deeplinkQueryParams: QueryParams = {
    Page: ProductDeeplink.PAGE,
    ContentId,
    CampaignId,
    MerchantId,
  };

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
});
