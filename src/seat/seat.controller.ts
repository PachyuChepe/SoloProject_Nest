// src/seat/seat.controller.ts

import { Controller, Post, Param } from '@nestjs/common';
import { SeatService } from './seat.service';

@Controller('seats')
export class SeatController {
  constructor(private seatService: SeatService) {}

  @Post('/create-from-template/performance/:performanceId/template/:templateId')
  async createSeatsFromTemplate(
    @Param('performanceId') performanceId: number,
    @Param('templateId') templateId: number,
  ) {
    return this.seatService.createSeatsFromTemplate(performanceId, templateId);
  }

  //API 엔드포인트 작성
}
