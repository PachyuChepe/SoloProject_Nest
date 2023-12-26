// src/performance/performance.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Performance } from './performance.entity';
import { CreatePerformanceDto } from './dto/create-performance.dto';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(Performance)
    private performanceRepository: Repository<Performance>,
  ) {}

  async createPerformance(
    performanceData: CreatePerformanceDto,
  ): Promise<Performance> {
    const newPerformance = this.performanceRepository.create(performanceData);
    return this.performanceRepository.save(newPerformance);
  }

  // 기타 필요한 메서드들...
}
