import { BadRequestException } from '@nestjs/common';

export class InvalidURLException extends BadRequestException {
  constructor() {
    super(`Invalid URL!`);
  }
}
