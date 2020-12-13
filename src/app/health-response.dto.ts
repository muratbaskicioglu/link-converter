import { ApiResponseProperty } from '@nestjs/swagger';

export class HealthResponseDto {
  @ApiResponseProperty()
  status: string;

  @ApiResponseProperty()
  time: number;
}
