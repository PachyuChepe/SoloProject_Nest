// src/seat/seat.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatService } from './seat.service';
import { SeatController } from './seat.controller';
import { Seat } from './seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seat])],
  providers: [SeatService],
  controllers: [SeatController],
})
export class SeatModule {}
