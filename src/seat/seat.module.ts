// src/seat/seat.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Performance } from '../performance/performance.entity';
import { SeatTemplate } from '../seat-template/seat-template.entity';

import { SeatController } from './seat.controller';
import { Seat } from './seat.entity';
import { SeatService } from './seat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Seat, Performance, SeatTemplate])],
  providers: [SeatService],
  controllers: [SeatController],
})
export class SeatModule {}
