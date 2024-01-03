// src/booking/dto/create-booking.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsArray,
  IsOptional,
  IsDateString,
  IsString,
} from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  @ApiProperty({ example: 123, description: '공연 ID' })
  performanceId: number;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: [1, 2, 3],
    description: '예매할 좌석 번호 배열',
    required: false,
  })
  seatNumbers?: number[]; // 좌석 번호 배열

  @IsDateString()
  @ApiProperty({ example: '2024-01-01', description: '공연 날짜' })
  date: string; // 공연 날짜 (날짜 형식을 검증하기 위해 IsDateString 데코레이터 사용)

  @IsString()
  @ApiProperty({ example: '18:00', description: '공연 시간' })
  time: string; // 공연 시간 (문자열 형식으로 표시)
}
