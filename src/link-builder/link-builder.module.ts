import { Module } from '@nestjs/common';
import { LinkBuilderService } from './link-builder.service';

@Module({
  providers: [LinkBuilderService],
  exports: [LinkBuilderService],
})
export class LinkBuilderModule {}
