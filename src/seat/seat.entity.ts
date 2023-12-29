// src/seat/seat.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Performance } from '../performance/performance.entity';
import { Booking } from 'src/booking/booking.entity';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Performance)
  performance: Performance; // 좌석이 속한 공연

  @ManyToOne(() => Booking, (booking) => booking.seats)
  booking: Booking;

  @Column()
  seatNumber: number; // 좌석 번호

  @Column()
  grade: string; // 좌석 등급 (예: A, B, VIP 등)

  @Column()
  price: number; // 좌석 가격

  @Column({ default: false })
  isBooked: boolean; // 좌석 예약 여부, 기본값 false
}
