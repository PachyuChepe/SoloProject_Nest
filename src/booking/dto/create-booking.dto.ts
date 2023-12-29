// src/booking/dto/create-booking.dto.ts

import {
  IsNumber,
  IsArray,
  IsOptional,
  IsDateString,
  IsString,
} from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  performanceId: number;

  @IsArray()
  @IsOptional()
  seatNumbers?: number[]; // 좌석 번호 배열

  @IsDateString()
  date: string; // 공연 날짜 (날짜 형식을 검증하기 위해 IsDateString 데코레이터 사용)

  @IsString()
  time: string; // 공연 시간 (문자열 형식으로 표시)
}
