// src/booking/dto/create-booking.dto.ts

import { IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  performanceId: number;

  @IsArray()
  @IsOptional()
  seatNumbers?: number[]; // 좌석 번호 배열
}
