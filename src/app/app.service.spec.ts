import { instance, mock, verify, when } from 'ts-mockito';
import { AppService } from './app.service';
import { InvalidURLException } from './exception/invalid-url.exception';
import { LinkBuilderService } from '../link-builder/link-builder.service';
import { ProductWebURL } from '../link-builder/web-url/product.web-url';
import { NotWebURLProvidedException } from './exception/not-web-url-provided.exception';
import { SearchDeeplink } from '../link-builder/deeplink/search.deeplink';
import { NotDeeplinkProvidedException } from './exception/not-deeplink-provided.exception';

describe('AppService', () => {
  let service: AppService;
  const mockedLinkBuilderService: LinkBuilderService = mock(LinkBuilderService);

  beforeEach(async () => {
    service = new AppService(instance(mockedLinkBuilderService));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('convertWebURLToDeeplink', () => {
    it('should be defined', () => {
      expect(service.convertWebURLToDeeplink).toBeDefined();
    });

    it('should convert Web URL to Deeplink correctly', async () => {
      const webURL =
        'https://www.trendyol.com/casio/saat-p-1925865?boutiqueId=439892&merchantId=105064';

      when(mockedLinkBuilderService.buildFor(webURL)).thenReturn(
        new ProductWebURL({
          brand: '',
          merchantId: '',
          productId: '',
          productName: '',
          boutiqueId: '',
        }),
      );

      service.convertWebURLToDeeplink(webURL);

      verify(mockedLinkBuilderService.buildFor(webURL)).called();
    });

    it('should throw an error if url is invalid', async () => {
      const invalidURL = 'invalidURL';

      when(mockedLinkBuilderService.buildFor(invalidURL)).thenThrow(
        new InvalidURLException(),
      );

      expect(() => {
        service.convertWebURLToDeeplink(invalidURL);
      }).toThrow(InvalidURLException);
    });

    it('should throw an error if not a Web URL given', async () => {
      const deeplink = 'ty://?Test=test';

      when(mockedLinkBuilderService.buildFor(deeplink)).thenThrow(
        new NotWebURLProvidedException(),
      );

      expect(() => {
        service.convertWebURLToDeeplink(deeplink);
      }).toThrow(NotWebURLProvidedException);
    });
  });

  describe('convertDeeplinkToWebURL', () => {
    it('should be defined', () => {
      expect(service.convertDeeplinkToWebURL).toBeDefined();
    });

    it('should convert Deeplink to Web URL correctly', async () => {
      const deeplink = 'ty://?Page=Search&Query=test';

      when(mockedLinkBuilderService.buildFor(deeplink)).thenReturn(
        new SearchDeeplink({ Query: 'test' }),
      );

      service.convertDeeplinkToWebURL(deeplink);

      verify(mockedLinkBuilderService.buildFor(deeplink)).called();
    });

    it('should throw an error if url is invalid', async () => {
      const invalidURL = 'invalidURL';

      when(mockedLinkBuilderService.buildFor(invalidURL)).thenThrow(
        new InvalidURLException(),
      );

      expect(() => {
        service.convertDeeplinkToWebURL(invalidURL);
      }).toThrow(InvalidURLException);
    });

    it('should throw an error if not a Web URL given', async () => {
      const webURL = 'https://testdomain';

      when(mockedLinkBuilderService.buildFor(webURL)).thenThrow(
        new NotDeeplinkProvidedException(),
      );

      expect(() => {
        service.convertWebURLToDeeplink(webURL);
      }).toThrow(NotDeeplinkProvidedException);
    });
  });
});
