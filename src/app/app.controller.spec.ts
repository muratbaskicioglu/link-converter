import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinkBuilderModule } from '../link-builder/link-builder.module';
import { verify } from 'ts-mockito';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [LinkBuilderModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return description', () => {
      expect(appController.getHello()).toBe(AppModule.description);
    });
  });

  describe(`webURLToDeeplink`, () => {
    it('should be defined', () => {
      expect(appController.webURLToDeeplink).toBeDefined();
    });

    it('should return call service', () => {
      const webURL =
        'https://www.trendyol.com/casio/saat-p-1925865?boutiqueId=439892&merchantId=105064';
      const deeplink =
        'ty://?Page=Product&ContentId=1925865&Camp a gnId=439892&MerchantId=105064';

      jest
        .spyOn(appService, 'convertWebURLToDeeplink')
        .mockImplementation(() => deeplink);

      expect(appController.webURLToDeeplink(webURL)).toBe(deeplink);
    });
  });
});
