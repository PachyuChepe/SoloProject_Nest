// src/booking/booking.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Booking } from './booking.entity';
import { Seat } from '../seat/seat.entity';
import { Performance } from '../performance/performance.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Seat, Performance, User])],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}
