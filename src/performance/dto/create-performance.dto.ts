// src/performance/dto/create-performance.dto.ts

import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

class ScheduleDto {
  @IsString()
  date: string;

  @IsString()
  time: string;
}

export class CreatePerformanceDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsArray()
  @IsObject({ each: true })
  schedule: ScheduleDto[];

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  imageUrl?: string;

  @IsNumber()
  @IsOptional()
  seatTemplateId?: number;
}
