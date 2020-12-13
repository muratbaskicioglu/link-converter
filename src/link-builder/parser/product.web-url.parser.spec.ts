import { ProductWebURLParser } from './product.web-url.parser';
import { createQueryString, QueryParams } from '../utilities';
import { ProductWebURL } from '../web-url/product.web-url';

describe('ProductWebURLParser', () => {
  const origin = 'https://trendyol.com';
  const brand = 'testBrand';
  const productName = 'test-product-name';
  const productId = 'test-product-id';
  const boutiqueId = 'testBoutiqueId';
  const merchantId = 'testMerchantId';
  let queryParams: QueryParams;
  let url, parser;

  beforeEach(() => {
    url = new URL(origin);
    parser = new ProductWebURLParser(url);
    queryParams = {
      boutiqueId,
      merchantId,
    };
  });

  it('should valid for parsing', () => {
    url.pathname = `/${brand}/${productName}${ProductWebURL.PRODUCT_PATH_SEPARATOR}${productId}`;

    expect(parser.canParse()).toBe(true);
  });

  it('should invalid for parsing', () => {
    url.pathname = `/${productName}${ProductWebURL.PRODUCT_PATH_SEPARATOR}${productId}`;

    expect(parser.canParse()).toBe(false);
  });

  it('should parse correctly', () => {
    url.pathname = `/${brand}/${productName}${ProductWebURL.PRODUCT_PATH_SEPARATOR}${productId}`;
    url.search = createQueryString(queryParams);

    expect(parser.parse()).toEqual({
      brand,
      productName,
      productId,
      boutiqueId,
      merchantId,
    });
  });

  it('should parse correctly without optional parameters', () => {
    url.pathname = `/${brand}/${productName}${ProductWebURL.PRODUCT_PATH_SEPARATOR}${productId}`;
    delete queryParams.merchantId;
    url.search = createQueryString(queryParams);

    expect(parser.parse()).toEqual({
      brand,
      productName,
      productId,
      boutiqueId,
    });
  });
});
