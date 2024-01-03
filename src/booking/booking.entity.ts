// src/booking/booking.entity.ts
import { Seat } from 'src/seat/seat.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Performance } from '../performance/performance.entity';
import { User } from '../user/user.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User; // 예약을 한 사용자

  @ManyToOne(() => Performance)
  performance: Performance; // 예약된 공연

  @OneToMany(() => Seat, (seat) => seat.booking)
  seats: Seat[];

  @Column()
  date: Date; // 예약 날짜
}
