import { Parser } from './parser.interface';
import { ProductWebURL, ProductWebURLParams } from '../web-url/product.web-url';

export class ProductWebURLParser implements Parser {
  constructor(private readonly url: URL) {}

  canParse(): boolean {
    const [, , productPath] = this.url.pathname.split('/');

    return !!(
      productPath && productPath.includes(ProductWebURL.PRODUCT_PATH_SEPARATOR)
    );
  }

  parse<ProductWebURLParams>(): any {
    const { pathname, searchParams } = this.url;
    const [, brand, product]: string[] = pathname.split('/');
    const [productName, productId]: string[] = product.split(
      ProductWebURL.PRODUCT_PATH_SEPARATOR,
    );
    const boutiqueId = this.nullishAndFalsyToUndefined<string>(
      searchParams.get('boutiqueId'),
    );
    const merchantId = this.nullishAndFalsyToUndefined<string>(
      searchParams.get('merchantId'),
    );

    return {
      brand,
      productName,
      productId,
      boutiqueId,
      merchantId,
    };
  }

  /**
   * To not set nullish and falsy values into query string.
   */
  nullishAndFalsyToUndefined<T>(value: T): T | undefined {
    return value ? value : undefined;
  }
}
