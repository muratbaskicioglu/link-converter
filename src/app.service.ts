import { Injectable } from '@nestjs/common';
import { AppModule } from './app.module';
import { HealthResponseDto } from './health-response.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return AppModule.description;
  }

  getHealth(): HealthResponseDto {
    return {
      status: 'Available',
      time: Date.now(),
    };
  }
}
