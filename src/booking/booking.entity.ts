// src/booking/booking.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Performance } from '../performance/performance.entity';
import { Seat } from 'src/seat/seat.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User; // 예약을 한 사용자

  @ManyToOne(() => Performance)
  performance: Performance; // 예약된 공연

  @ManyToOne(() => Seat)
  seat: Seat; // 예약된 좌석

  @Column()
  date: Date; // 예약 날짜
}
