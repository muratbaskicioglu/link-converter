import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development.local'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static description = `
    Hello, the API provides to convert links to another type of links.
    See the documentation page for more information.
    - by Murat Baskıcıoğlu
  `;
}
