import { Injectable } from '@nestjs/common';
import { HealthResponseDto } from './health-response.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      Hello, the API provides to convert links to another type of links.
      See the documentation page for more information.
      - by Murat Baskıcıoğlu
    `;
  }

  getHealth(): HealthResponseDto {
    return {
      status: 'Available',
      time: Date.now(),
    };
  }
}
