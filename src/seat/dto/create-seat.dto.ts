// src/seat/dto/create-seat.dto.ts
import { IsNumber, IsString, IsBoolean } from 'class-validator';

export class CreateSeatDto {
  @IsNumber()
  performanceId: number;

  @IsNumber()
  seatNumber: number;

  @IsString()
  grade: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  isBooked: boolean = false;
}
