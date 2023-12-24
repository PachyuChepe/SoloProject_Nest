import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { Performance } from './performance.entity';

@Controller('performances')
export class PerformanceController {
  constructor(private performanceService: PerformanceService) {}

  // API 엔드포인트 작성
}
