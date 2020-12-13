import { LinkBuilderService } from './link-builder.service';
import { WebURL } from './web-url/web-url';
import { HomeWebURL } from './web-url/home.web-url';
import { ProductWebURL } from './web-url/product.web-url';
import { Test, TestingModule } from '@nestjs/testing';
import { createQueryString } from './utilities';
import { Deeplink } from './deeplink/deeplink';
import { ProductDeeplink } from './deeplink/product.deeplink';
import { HomeDeeplink } from './deeplink/home.deeplink';

describe('LinkBuilderService', () => {
  let service: LinkBuilderService;
  const brand = 'testBrand';
  const productName = 'testProductName';
  const productId = 'testProductId';
  const boutiqueId = 'testBoutiqueId';
  const merchantId = 'testMerchantId';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinkBuilderService],
    }).compile();

    service = module.get<LinkBuilderService>(LinkBuilderService);
  });

  describe('WebURL', () => {
    const domain = 'testdomain';
    const origin = `${WebURL.WEB_URL_PROTOCOLS[0]}//${domain}`;

    it('should return WebURL type of link', () => {
      WebURL.WEB_URL_PROTOCOLS.forEach((protocol) => {
        expect(
          service.buildFor(
            `${protocol}//${domain}/${brand}/${productName}-p-${productId}?boutiqueId=${boutiqueId}`,
          ),
        ).toBeInstanceOf(WebURL);
      });
    });

    it('should return correct page of WebURL type of link', () => {
      expect(
        service.buildFor(
          `${origin}/${brand}/${productName}-p-${productId}?boutiqueId=${boutiqueId}&merchantId=${merchantId}`,
        ),
      ).toBeInstanceOf(ProductWebURL);
    });

    it('should return HomeWebURL if there is no matched page', () => {
      expect(service.buildFor(`${origin}/unknownPage`)).toBeInstanceOf(
        HomeWebURL,
      );
    });
  });

  describe('Deeplink', () => {
    it('should return Deeplink type of link', () => {
      Deeplink.DEEPLINK_PROTOCOLS.forEach((protocol) => {
        expect(service.buildFor(`${protocol}//`)).toBeInstanceOf(Deeplink);
      });
    });

    it('should return correct page of Deeplink type of link', () => {
      expect(
        service.buildFor(
          `${Deeplink.DEEPLINK_PROTOCOLS[0]}//${createQueryString({
            Page: ProductDeeplink.PAGE,
            ContentId: productId,
          })}`,
        ),
      ).toBeInstanceOf(ProductDeeplink);
    });

    it('should return HomeDeeplink if there is no matched page', () => {
      expect(
        service.buildFor(`${Deeplink.DEEPLINK_PROTOCOLS[0]}//Page=Unknown`),
      ).toBeInstanceOf(HomeDeeplink);
    });
  });
});
