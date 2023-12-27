// src/seat/seat.controller.ts

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SeatService } from './seat.service';
import { CreateSeatDto } from './dto/create-seat.dto';

@Controller('seats')
export class SeatController {
  constructor(private seatService: SeatService) {}

  // 좌석 생성
  @Post()
  async createSeat(@Body() createSeatDto: CreateSeatDto) {
    return this.seatService.createSeat(createSeatDto);
  }

  // 좌석 조회
  @Get('/performance/:performanceId')
  async getSeatsByPerformance(@Param('performanceId') performanceId: number) {
    return this.seatService.findSeatsByPerformance(performanceId);
  }
  //API 엔드포인트 작성
}
