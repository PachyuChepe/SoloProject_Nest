// src/booking/booking.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Performance } from '../performance/performance.entity';
import { Seat } from '../seat/seat.entity';
import { User } from '../user/user.entity';

import { BookingController } from './booking.controller';
import { Booking } from './booking.entity';
import { BookingService } from './booking.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Seat, Performance, User])],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}
