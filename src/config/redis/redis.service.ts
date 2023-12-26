// src/config/redis/redis.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.client = createClient({
      url: `redis://${this.configService.get(
        'REDIS_USERNAME',
      )}:${this.configService.get('REDIS_PASSWORD')}@${this.configService.get(
        'REDIS_HOST',
      )}:${this.configService.get('REDIS_PORT')}/0`,
      // url: `redis://${this.configService.get(
      //   'REDIS_HOST',
      // )}:${this.configService.get('REDIS_PORT')}`,
      // password: this.configService.get('REDIS_PASSWORD'),
    });

    this.client.on('error', (error) => console.error(`Redis Error: ${error}`));

    await this.client.connect();
    console.log('Connected to Redis');
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  async setRefreshToken(userId: string, token: string): Promise<void> {
    await this.client.set(`refresh_token:${userId}`, token, {
      EX: 60 * 60 * 24 * 7, // 7일 유효기간
    });
  }

  async getRefreshToken(userId: string): Promise<string | null> {
    return await this.client.get(`refresh_token:${userId}`);
  }

  async removeRefreshToken(userId: string): Promise<void> {
    await this.client.del(`refresh_token:${userId}`);
  }
}
