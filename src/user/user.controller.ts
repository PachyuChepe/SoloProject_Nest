// src/user/user.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    console.log('뭐뭐들어옴?', req.user);
    // const currentTime = Math.floor(Date.now() / 1000);
    // if (req.user.exp && req.user.exp < currentTime) {
    //   throw new UnauthorizedException('토큰이 만료되었습니다.');
    // }

    return this.userService.findOne(req.user.email);
  }
}
