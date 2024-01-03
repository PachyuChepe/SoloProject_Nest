// src/performance/performance.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatTemplate } from 'src/seat-template/seat-template.entity';

import { Seat } from '../seat/seat.entity';

import { PerformanceController } from './performance.controller';
import { Performance } from './performance.entity';
import { PerformanceService } from './performance.service';

@Module({
  imports: [TypeOrmModule.forFeature([Performance, Seat, SeatTemplate])],
  providers: [PerformanceService],
  controllers: [PerformanceController],
})
export class PerformanceModule {}
