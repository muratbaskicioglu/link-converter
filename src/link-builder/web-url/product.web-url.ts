import { WebURL } from './web-url';
import { Deeplink } from '../deeplink/deeplink';
import { ProductDeeplink } from '../deeplink/product.deeplink';
import { createQueryString } from '../create-query-string';

export type ProductWebURLParams = {
  brand: string;
  productName: string;
  productId: string;
  boutiqueId?: string;
  merchantId?: string;
};

export class ProductWebURL extends WebURL {
  static PRODUCT_PATH_SEPARATOR = '-p-';

  constructor(private readonly params: ProductWebURLParams) {
    super(
      `https://trendyol.com/${params.brand}/${params.productName}${ProductWebURL.PRODUCT_PATH_SEPARATOR}${params.productId}`,
    );

    const { boutiqueId, merchantId } = params;

    this.search = createQueryString({
      boutiqueId,
      merchantId,
    });
  }

  toDeeplink(): Deeplink {
    return new ProductDeeplink({
      ContentId: this.params.productId,
      CampaignId: this.params.boutiqueId,
      MerchantId: this.params.merchantId,
    });
  }
}
