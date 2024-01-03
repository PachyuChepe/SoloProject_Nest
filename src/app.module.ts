// src/app.module.ts
import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { Booking } from './booking/booking.entity';
import { BookingModule } from './booking/booking.module';
import { RedisModule } from './config/redis/redis.module';
import { Performance } from './performance/performance.entity';
import { PerformanceModule } from './performance/performance.module';
import { Seat } from './seat/seat.entity';
import { SeatModule } from './seat/seat.module';
import { SeatTemplate } from './seat-template/seat-template.entity';
import { SeatTemplateModule } from './seat-template/seat-template.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      isGlobal: true, // 전역적으로 사용하도록 설정
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [User, Performance, Booking, Seat, SeatTemplate],
        synchronize: configService.get('SYNCHRONIZE') === 'true', // 서버 시작 시 DB 마이그레이션 ON
        logging: false, // DB 로깅 옵션
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    PerformanceModule,
    BookingModule,
    SeatModule,
    RedisModule,
    SeatTemplateModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
