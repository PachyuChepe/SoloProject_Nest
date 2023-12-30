// src/config/redis/redis-cloud.module.ts
import { Global, Module } from '@nestjs/common';
// import { RedisService } from './redis.service';
// import { RedisModule as IORedisModule } from '@nestjs-modules/ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get('REDIS_HOST'),
          port: config.get<number>('REDIS_PORT'),
          password: config.get('REDIS_PASSWORD'),
        },
      }),
    }),
  ],
  providers: [],
  exports: [BullModule],
})
export class RedisModule {}
