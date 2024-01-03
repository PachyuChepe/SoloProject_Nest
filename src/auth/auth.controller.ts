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
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { RedisService } from '../config/redis/redis.service';
import { UserService } from '../user/user.service';

import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private redisService: RedisService,
  ) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 201, description: '로그인 성공' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  @ApiBody({ type: LoginUserDto })
  async login(@Body() loginUserDto: LoginUserDto, @Request() req) {
    // LoginUserDto를 사용하여 요청 본문의 유효성 검사
    return this.authService.login(req.user);
  }

  @Post('/refresh')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '액세스 토큰 갱신',
    description: '리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급받습니다.',
  })
  @ApiResponse({ status: 200, description: '새로운 액세스 토큰 발급 성공' })
  @ApiResponse({ status: 401, description: '리프레시 토큰 유효하지 않음' })
  async refreshAccessToken(@Req() req) {
    const user = req.user;
    // const currentTime = Math.floor(Date.now() / 1000);

    // 토큰이 만료되었는지 확인
    // if (!user.exp || user.exp > currentTime) {
    //   throw new UnauthorizedException(
    //     '엑세스 토큰이 아직 만료되지 않았습니다.',
    //   );
    // }

    const refreshToken = await this.redisService.getRefreshToken(user.email);
    if (!refreshToken) {
      throw new UnauthorizedException('리프레시 토큰이 유효하지 않습니다.');
    }

    const newAccessToken = this.authService.generateAccessToken(user);

    return { access_token: newAccessToken };
  }
}
