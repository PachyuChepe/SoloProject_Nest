// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { User } from './user/user.entity';
import { Booking } from './booking/booking.entity';
import { Seat } from './seat/seat.entity';
import { Performance } from './performance/performance.entity';
import { SeatTemplate } from './seat-template/seat-template.entity';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PerformanceModule } from './performance/performance.module';
import { BookingModule } from './booking/booking.module';
import { SeatModule } from './seat/seat.module';
import { SeatTemplateModule } from './seat-template/seat-template.module';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { RedisModule } from './config/redis/redis.module';

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
