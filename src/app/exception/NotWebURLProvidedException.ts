import { BadRequestException } from '@nestjs/common';

export class NotWebURLProvidedException extends BadRequestException {
  constructor() {
    super(`Not a Web URL provided!`);
  }
}
