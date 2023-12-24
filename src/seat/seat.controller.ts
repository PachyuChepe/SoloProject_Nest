import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SeatService } from './seat.service';
import { Seat } from './seat.entity';

@Controller('seats')
export class SeatController {
  constructor(private seatService: SeatService) {}

  //API 엔드포인트 작성
}
