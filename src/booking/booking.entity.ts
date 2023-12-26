// src/booking/booking.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Performance } from '../performance/performance.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User; // 예약을 한 사용자

  @ManyToOne(() => Performance)
  performance: Performance; // 예약된 공연

  @Column()
  date: Date; // 예약 날짜
}
