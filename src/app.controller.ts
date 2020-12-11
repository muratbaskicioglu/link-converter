import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiExcludeEndpoint } from '@nestjs/swagger';
import { AppService } from './app.service';
import { HealthResponseDto } from './health-response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiExcludeEndpoint()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOkResponse({ type: HealthResponseDto })
  @Get('health')
  getHealth(): HealthResponseDto {
    return this.appService.getHealth();
  }
}
