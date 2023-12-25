// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

// // src/app.controller.ts

// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';
// import { RedisService } from './redis/redis.service';

// @Controller()
// export class AppController {
//   constructor(
//     private readonly appService: AppService,
//     private readonly redisService: RedisService,
//   ) {}

//   @Get()
//   async getHello(): Promise<string> {
//     const redisClient = this.redisService.getClient();

//     // Redis 테스트 쿼리 실행
//     await redisClient.set('testKey', 'Hello Redis');
//     const value = await redisClient.get('testKey');

//     return `Value from Redis: ${value}`;
//   }
// }
