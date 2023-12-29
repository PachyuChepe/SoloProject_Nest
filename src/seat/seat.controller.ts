// src/seat/seat.controller.ts

import {
  Controller,
  Post,
  Param,
  UseGuards,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { SeatService } from './seat.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('seats')
export class SeatController {
  constructor(private seatService: SeatService) {}

  @Post('/create-from-template/performance/:performanceId/template/:templateId')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  async createSeatsFromTemplate(
    @Param('performanceId') performanceId: number,
    @Param('templateId') templateId: number,
    @Req() req,
  ) {
    if (!req.user.isAdmin) {
      throw new UnauthorizedException('관리자 권한이 필요합니다.');
    }

    return this.seatService.createSeatsFromTemplate(performanceId, templateId);
  }
}
