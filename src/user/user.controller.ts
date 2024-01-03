// src/user/user.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RedisService } from '../config/redis/redis.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly redisService: RedisService,
  ) {}

  @Post()
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return { message: '회원가입 성공', user };
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req) {
    // const currentTime = Math.floor(Date.now() / 1000);
    // if (req.user.exp && req.user.exp < currentTime) {
    //   throw new UnauthorizedException('토큰이 만료되었습니다.');
    // }

    return this.userService.findOne(req.user.email);
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Patch()
  async updateUser(@Request() req, @Body() updateData: UpdateUserDto) {
    const user = await this.userService.updateUser(req.user.email, updateData);
    return { message: '사용자 정보 업데이트 성공', user };
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Delete()
  async deleteUser(@Request() req) {
    await this.userService.deleteUser(req.user.email);
    await this.redisService.removeRefreshToken(req.user.email); // 리프레시 토큰 제거
    return { message: '사용자 삭제 성공' };
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Post('/logout')
  async logout(@Request() req) {
    await this.redisService.removeRefreshToken(req.user.email); // 리프레시 토큰 제거
    return { message: '로그아웃 성공' };
  }
}
