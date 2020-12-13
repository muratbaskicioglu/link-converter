import { LinkBuilderService } from './link-builder.service';
import { WebURL } from './web-url/web-url';
import { HomeWebURL } from './web-url/home.web-url';
import { ProductWebURL } from './web-url/product.web-url';
import { Test, TestingModule } from '@nestjs/testing';

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
});
