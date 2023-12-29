// src/performance/performance.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerformanceService } from './performance.service';
import { PerformanceController } from './performance.controller';
import { Performance } from './performance.entity';
import { Seat } from '../seat/seat.entity';
import { SeatTemplate } from 'src/seat-template/seat-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Performance, Seat, SeatTemplate])],
  providers: [PerformanceService],
  controllers: [PerformanceController],
})
export class PerformanceModule {}
