// src/seat/seat.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatService } from './seat.service';
import { SeatController } from './seat.controller';
import { Seat } from './seat.entity';
import { Performance } from '../performance/performance.entity';
import { SeatTemplate } from '../seat-template/seat-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seat, Performance, SeatTemplate])],
  providers: [SeatService],
  controllers: [SeatController],
})
export class SeatModule {}
