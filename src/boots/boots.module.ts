import { Module } from '@nestjs/common';
import { BootsController } from './boots.controller';
import { BootsService } from './boots.service';
import { GoogleService } from './google.service';

@Module({
  controllers: [BootsController],
  providers: [BootsService, GoogleService],
})
export class BootsModule {}
