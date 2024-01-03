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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RedisService } from '../config/redis/redis.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly redisService: RedisService,
  ) {}

  @Post()
  @ApiOperation({
    summary: '회원가입',
    description: '새로운 사용자를 등록합니다.',
  })
  @ApiResponse({ status: 201, description: '회원가입 성공' })
  @ApiResponse({ status: 409, description: '이미 가입된 이메일입니다.' })
  @ApiBody({ type: CreateUserDto })
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return { message: '회원가입 성공', user };
  }

  @Get('/profile')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '사용자 프로필 조회',
    description: '로그인한 사용자의 프로필을 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '프로필 조회 성공' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  async getProfile(@Request() req) {
    // const currentTime = Math.floor(Date.now() / 1000);
    // if (req.user.exp && req.user.exp < currentTime) {
    //   throw new UnauthorizedException('토큰이 만료되었습니다.');
    // }

    return this.userService.findOne(req.user.email);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '사용자 정보 업데이트',
    description: '로그인한 사용자의 정보를 업데이트합니다.',
  })
  @ApiResponse({ status: 200, description: '사용자 정보 업데이트 성공' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  @ApiResponse({ status: 404, description: '사용자를 찾을 수 없습니다.' })
  @ApiBody({ type: UpdateUserDto })
  async updateUser(@Request() req, @Body() updateData: UpdateUserDto) {
    const user = await this.userService.updateUser(req.user.email, updateData);
    return { message: '사용자 정보 업데이트 성공', user };
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '사용자 삭제',
    description: '로그인한 사용자를 삭제합니다.',
  })
  @ApiResponse({ status: 200, description: '사용자 삭제 성공' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  @ApiResponse({ status: 404, description: '사용자를 찾을 수 없습니다.' })
  async deleteUser(@Request() req) {
    await this.userService.deleteUser(req.user.email);
    await this.redisService.removeRefreshToken(req.user.email); // 리프레시 토큰 제거
    return { message: '사용자 삭제 성공' };
  }

  @Post('/logout')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '로그아웃',
    description: '사용자를 로그아웃 처리합니다.',
  })
  @ApiResponse({ status: 200, description: '로그아웃 성공' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  async logout(@Request() req) {
    await this.redisService.removeRefreshToken(req.user.email); // 리프레시 토큰 제거
    return { message: '로그아웃 성공' };
  }
}
