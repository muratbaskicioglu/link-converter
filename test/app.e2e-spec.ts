import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppController } from '../src/app/app.controller';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication(new FastifyAdapter());
    app.getHttpAdapter().getInstance().ready();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(AppModule.description);
  });

  describe(`${AppController.Endpoint.webURLToDeeplink()} GET`, () => {
    const invalidURL = 'invalidURL';

    describe('product page', () => {
      const webURL =
        'https://trendyol.com/casio/saat-p-1925865?boutiqueId=439892&merchantId=105064';

      it('should return converted Deeplink', () => {
        return request(app.getHttpServer())
          .get(
            `${AppController.Endpoint.webURLToDeeplink(
              encodeURIComponent(webURL),
            )}`,
          )
          .expect(200)
          .expect(
            'ty://?Page=Product&ContentId=1925865&CampaignId=439892&MerchantId=105064',
          );
      });
    });

    describe('search page', () => {
      const webURL = 'https://trendyol.com/tum--urunler?q=elbise';

      it('should return converted Deeplink', () => {
        return request(app.getHttpServer())
          .get(
            `${AppController.Endpoint.webURLToDeeplink(
              encodeURIComponent(webURL),
            )}`,
          )
          .expect(200)
          .expect('ty://?Page=Search&Query=elbise');
      });
    });

    describe('home page', () => {
      const webURL = 'https://trendyol.com/Hesabim/Favoriler';

      it('should return converted Deeplink', () => {
        return request(app.getHttpServer())
          .get(
            `${AppController.Endpoint.webURLToDeeplink(
              encodeURIComponent(webURL),
            )}`,
          )
          .expect(200)
          .expect('ty://?Page=Home');
      });
    });

    it('should return invalid parameter bad request', () => {
      return request(app.getHttpServer())
        .get(`${AppController.Endpoint.webURLToDeeplink(invalidURL)}`)
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid URL!',
          error: 'Bad Request',
        });
    });
  });

  describe(`${AppController.Endpoint.deeplinkToWebURL()} GET`, () => {
    const invalidURL = 'invalidURL';

    describe('product page', () => {
      const deeplink =
        'ty://?Page=Product&ContentId=1925865&CampaignId=439892&MerchantId=105064';
      const webURL =
        'https://trendyol.com/brand/name-p-1925865?boutiqueId=439892&merchantId=105064';

      it('should return converted WebURL', () => {
        return request(app.getHttpServer())
          .get(
            `${AppController.Endpoint.deeplinkToWebURL(
              encodeURIComponent(deeplink),
            )}`,
          )
          .expect(200)
          .expect(webURL);
      });
    });

    describe('search page', () => {
      const deeplink = 'ty://?Page=Search&Query=elbise';
      const webURL = 'https://trendyol.com/tum--urunler?q=elbise';

      it('should return converted WebURL', () => {
        return request(app.getHttpServer())
          .get(
            `${AppController.Endpoint.deeplinkToWebURL(
              encodeURIComponent(deeplink),
            )}`,
          )
          .expect(200)
          .expect(webURL);
      });
    });

    describe('home page', () => {
      const deeplink = 'ty://?Page=Favorites';
      const webURL = 'https://trendyol.com/';

      it('should return converted Deeplink', () => {
        return request(app.getHttpServer())
          .get(
            `${AppController.Endpoint.deeplinkToWebURL(
              encodeURIComponent(deeplink),
            )}`,
          )
          .expect(200)
          .expect(webURL);
      });
    });

    it('should return invalid parameter bad request', () => {
      return request(app.getHttpServer())
        .get(`${AppController.Endpoint.deeplinkToWebURL(invalidURL)}`)
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid URL!',
          error: 'Bad Request',
        });
    });
  });
});
