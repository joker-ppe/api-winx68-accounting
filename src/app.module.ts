import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
// import { ScheduleController } from './schedule/schedule.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { PartnerModule } from './partner/partner.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    PartnerModule,
  ],
})
export class AppModule {}
