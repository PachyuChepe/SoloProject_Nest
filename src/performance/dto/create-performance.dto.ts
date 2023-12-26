// src/performance/dto/create-performance.dto.ts

import { IsString, IsArray, IsNumber, IsOptional } from 'class-validator';

export class CreatePerformanceDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsArray()
  @IsString({ each: true })
  schedule: string[];

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  category?: string; // 카테고리는 선택 사항
}
