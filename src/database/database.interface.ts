import { DynamicModule } from '@nestjs/common';

export interface Database {
  register(): DynamicModule;
  registerAsync(): DynamicModule;
}
