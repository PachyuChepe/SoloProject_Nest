// src/performance/dto/search-performance.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class SearchPerformanceDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '뮤지컬',
    description: '검색할 공연 제목',
    required: false,
  })
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '드라마',
    description: '검색할 공연 카테고리',
    required: false,
  })
  category?: string;
}
