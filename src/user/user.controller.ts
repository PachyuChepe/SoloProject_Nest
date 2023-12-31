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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { RedisService } from '../config/redis/redis.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly redisService: RedisService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    // const currentTime = Math.floor(Date.now() / 1000);
    // if (req.user.exp && req.user.exp < currentTime) {
    //   throw new UnauthorizedException('토큰이 만료되었습니다.');
    // }

    return this.userService.findOne(req.user.email);
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Patch('update')
  async updateUser(@Request() req, @Body() updateData: UpdateUserDto) {
    return this.userService.updateUser(req.user.email, updateData);
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Delete('delete')
  async deleteUser(@Request() req) {
    await this.userService.deleteUser(req.user.email);
    await this.redisService.removeRefreshToken(req.user.email); // 리프레시 토큰 제거
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    await this.redisService.removeRefreshToken(req.user.email); // 리프레시 토큰 제거
  }
}
