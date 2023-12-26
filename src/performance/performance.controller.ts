// src/performance/performance.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('performances')
export class PerformanceController {
  constructor(private performanceService: PerformanceService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  async createPerformance(
    @Body() performanceData: CreatePerformanceDto,
    @Req() req,
  ) {
    const user = req.user;
    if (!user.isAdmin) {
      throw new UnauthorizedException('관리자만 공연을 생성할 수 있습니다.');
    }
    return this.performanceService.createPerformance(performanceData);
  }

  // 기타 엔드포인트들...
}
