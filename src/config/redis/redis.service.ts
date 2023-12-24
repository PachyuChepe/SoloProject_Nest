// src/redis/redis.service.ts

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
        'REDIS_HOST',
      )}:${this.configService.get('REDIS_PORT')}`,
      password: this.configService.get('REDIS_PASSWORD'),
    });

    this.client.on('error', (error) => console.error(`Redis Error: ${error}`));

    await this.client.connect();
    console.log('Connected to Redis');
  }

  getClient(): RedisClientType {
    return this.client;
  }

  async onModuleDestroy() {
    await this.client.quit();
  }
}
