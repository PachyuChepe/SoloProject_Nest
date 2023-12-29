// src/performance/dto/get-performance-detail.dto.ts

import { IsNumber } from 'class-validator';

export class GetPerformanceDetailDto {
  @IsNumber()
  performanceId: number;
}
