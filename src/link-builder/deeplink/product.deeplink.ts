import { Deeplink } from './deeplink';
import { createQueryString } from '../utilities';
import { ProductWebURL } from '../web-url/product.web-url';

export type ProductDeeplinkParams = {
  ContentId: string;
  CampaignId: string;
  MerchantId: string;
};

export class ProductDeeplink extends Deeplink {
  static readonly PAGE = 'Product';

  constructor(private params: ProductDeeplinkParams) {
    super(`${Deeplink.DEEPLINK_PROTOCOLS[0]}//`);

    const { ContentId, CampaignId, MerchantId } = params;

    this.search = createQueryString({
      Page: ProductDeeplink.PAGE,
      ContentId,
      CampaignId,
      MerchantId,
    });
  }

  toWebURL(): ProductWebURL {
    return new ProductWebURL({
      brand: 'brand',
      productName: 'name',
      productId: this.params.ContentId,
      boutiqueId: this.params.CampaignId,
      merchantId: this.params.MerchantId,
    });
  }
}
