import { BadRequestException } from '@nestjs/common';

export class NotDeeplinkProvidedException extends BadRequestException {
  constructor() {
    super(`Not a Deeplink provided!`);
  }
}
