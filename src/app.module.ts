import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BootsModule } from './boots/boots.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

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
  providers: [],
})
export class AppModule {}
