// src/main.ts
import * as fs from 'fs';
import * as https from 'https';
import * as path from 'path';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 인증 키 파일 경로 설정
  const keyPath = path.join(__dirname, '..', 'key.pem');
  const certPath = path.join(__dirname, '..', 'cert.pem');

  // HTTPS 설정
  if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    const httpsOptions = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    };
    await app.init();
    https
      .createServer(httpsOptions, app.getHttpAdapter().getInstance())
      .listen(4000);
    console.log(`HTTPS server running on port 4000`);
  } else {
    // HTTP로 실행
    await app.listen(4000);
    console.log(`HTTP server running on port 4000`);
  }
}

bootstrap();
