import { ProductWebURL } from './product.web-url';
import { createQueryString, QueryParams } from '../create-query-string';
import { Deeplink } from '../deeplink/deeplink';
import { ProductDeeplink } from '../deeplink/product.deeplink';

describe('ProductWebURL', () => {
  const origin = 'https://trendyol.com';
  const brand = 'testBrand';
  const productName = 'testProductName';
  const productId = 'testProductId';
  const boutiqueId = 'testBoutiqueId';
  const merchantId = 'testMerchantId';
  const queryParams: QueryParams = {
    boutiqueId,
    merchantId,
  };
  const deeplinkQueryParams: QueryParams = {
    Page: ProductDeeplink.PAGE,
    ContentId: productId,
    CampaignId: boutiqueId,
    MerchantId: merchantId,
  };
  const productWebURL = new ProductWebURL({
    brand,
    productName,
    productId,
    boutiqueId,
    merchantId,
  });

  it('should return correct url', () => {
    expect(productWebURL.toString()).toBe(
      `${origin}/${brand}/${productName}${
        ProductWebURL.PRODUCT_PATH_SEPARATOR
      }${productId}${createQueryString(queryParams)}`,
    );
  });

  it('should convert to ProductDeeplink correctly', () => {
    expect(productWebURL.toDeeplink()).toBeInstanceOf(ProductDeeplink);
  });

  it('should convert to correct ProductDeeplink url', () => {
    expect(productWebURL.toDeeplink().toString()).toBe(
      `${Deeplink.DEEPLINK_PROTOCOLS[0]}//${createQueryString(
        deeplinkQueryParams,
      )}`,
    );
  });
});
