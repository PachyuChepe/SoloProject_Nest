// src/performance/dto/search-performance.dto.ts

import { IsString, IsOptional } from 'class-validator';

export class SearchPerformanceDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  category?: string;
}
