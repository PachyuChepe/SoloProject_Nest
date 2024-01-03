// src/performance/dto/update-performance.dto.ts
import {
  IsString,
  IsArray,
  IsNumber,
  IsOptional,
  IsObject,
} from 'class-validator';

class ScheduleDto {
  @IsString()
  date: string;

  @IsString()
  time: string;
}

export class UpdatePerformanceDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsArray()
  @IsOptional()
  @IsObject({ each: true })
  schedule?: ScheduleDto[];

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsNumber()
  @IsOptional()
  seatTemplateId?: number;
}
