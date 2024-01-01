import { Module } from '@nestjs/common';
import { BootsController } from './boots.controller';
import { BootsService } from './boots.service';
import { GoogleService } from './google.service';
import { Timeout } from '@nestjs/schedule';

@Module({
  controllers: [BootsController],
  providers: [BootsService, GoogleService],
})
export class BootsModule {}
