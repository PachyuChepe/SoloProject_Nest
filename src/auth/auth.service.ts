// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { RedisService } from '../config/redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private redisService: RedisService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException(
        '존재하지 않는 회원이거나 비밀번호가 틀립니다.',
      );
    }
    console.log('user 너냐?', user);
    return user; // 전체 사용자 객체 반환
  }

  async login(user: any) {
    console.log('user.id 뜨냐?', user);
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    console.log(payload, '너도 이렇게 뜨냐?');
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.redisService.setRefreshToken(user.email, refreshToken);

    return {
      access_token: accessToken,
    };
  }

  generateAccessToken(user: any) {
    console.log(user, '오긴하냐?');
    const payload = { email: user.email, sub: user.id };
    console.log(payload, '만들어지긴했냐?');
    return this.jwtService.sign(payload);
  }
}
