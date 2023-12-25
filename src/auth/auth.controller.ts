// src/auth/auth.controller.ts
import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Request() req) {
    // LoginUserDto를 사용하여 요청 본문의 유효성 검사
    return this.authService.login(req.user); // 수정된 부분
  }
}
