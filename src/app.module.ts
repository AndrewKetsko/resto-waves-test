import { Module, ValidationPipe } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BootsModule } from './boots/boots.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    BootsModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) },
  ],
})
export class AppModule {}
