import { Deeplink } from './deeplink';
import { createQueryString } from '../utilities';

export type ProductDeeplinkParams = {
  ContentId: string;
  CampaignId: string;
  MerchantId: string;
};

export class ProductDeeplink extends Deeplink {
  static readonly PAGE = 'Product';

  constructor(params: ProductDeeplinkParams) {
    super(`${Deeplink.DEEPLINK_PROTOCOLS[0]}//`);

    const { ContentId, CampaignId, MerchantId } = params;

    this.search = createQueryString({
      Page: ProductDeeplink.PAGE,
      ContentId,
      CampaignId,
      MerchantId,
    });
  }
}
