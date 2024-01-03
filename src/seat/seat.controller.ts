// src/seat/seat.controller.ts
import {
  Controller,
  Post,
  Param,
  UseGuards,
  Delete,
  Patch,
  Get,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AdminGuard } from '../auth/guard/admin-auth.guard';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

import { SeatService } from './seat.service';

@Controller('seat')
export class SeatController {
  constructor(private seatService: SeatService) {}

  @Post('/performance/:performanceId/template/:templateId')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, AdminGuard)
  async createSeatsFromTemplate(
    @Param('performanceId') performanceId: number,
    @Param('templateId') templateId: number,
  ) {
    await this.seatService.createSeatsFromTemplate(performanceId, templateId);
    return {
      message: '좌석이 성공적으로 생성되었습니다.',
      performanceId,
      templateId,
    };
  }

  @Get('/performance/:performanceId')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, AdminGuard)
  async getSeatsByPerformance(@Param('performanceId') performanceId: number) {
    const seats =
      await this.seatService.findAllSeatsByPerformance(performanceId);
    return { message: '좌석 전체 조회 성공', seats };
  }

  @Get('/:seatId')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, AdminGuard)
  async getSeatById(@Param('seatId') seatId: number) {
    const seat = await this.seatService.findSeatById(seatId);
    return { message: '좌석 상세 조회 성공', seat };
  }

  @Patch('/:seatId')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, AdminGuard)
  async updateSeat(@Param('seatId') seatId: number, @Body() updateData: any) {
    await this.seatService.updateSeat(seatId, updateData);
    return { message: '좌석 수정 완료', seatId };
  }

  @Delete('/:seatId')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, AdminGuard)
  async deleteSeat(@Param('seatId') seatId: number) {
    await this.seatService.deleteSeat(seatId);
    return { message: '좌석 삭제 완료', seatId };
  }

  @Patch('/performance/:performanceId/template/:templateId')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, AdminGuard)
  async updateSeatsFromTemplate(
    @Param('performanceId') performanceId: number,
    @Param('templateId') templateId: number,
  ) {
    await this.seatService.updateSeatsFromTemplate(performanceId, templateId);
    return {
      message: '좌석이 성공적으로 업데이트되었습니다.',
      performanceId,
      templateId,
    };
  }

  @Delete('/performance/:performanceId')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, AdminGuard)
  async deleteSeatsByPerformance(
    @Param('performanceId') performanceId: number,
  ) {
    await this.seatService.deleteSeatsByPerformance(performanceId);
    return {
      message: '공연에 할당된 전체 좌석이 삭제되었습니다.',
      performanceId,
    };
  }
}
