// src/auth/auth.controller.ts
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { RedisService } from '../config/redis/redis.service';

import { LocalAuthGuard } from './guard/local-auth.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private redisService: RedisService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Request() req) {
    // LoginUserDto를 사용하여 요청 본문의 유효성 검사
    return this.authService.login(req.user); // 수정된 부분
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  async refreshAccessToken(@Req() req) {
    const user = req.user;
    const currentTime = Math.floor(Date.now() / 1000);

    // 토큰이 만료되었는지 확인
    if (!user.exp || user.exp > currentTime) {
      throw new UnauthorizedException(
        '엑세스 토큰이 아직 만료되지 않았습니다.',
      );
    }

    const refreshToken = await this.redisService.getRefreshToken(user.email);
    if (!refreshToken) {
      throw new UnauthorizedException('리프레시 토큰이 유효하지 않습니다.');
    }

    const newAccessToken = this.authService.generateAccessToken(user);
    console.log('newAccessToken', newAccessToken);
    return { access_token: newAccessToken };
  }
}
