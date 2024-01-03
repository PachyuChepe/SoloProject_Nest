// src/seat/seat.entity.ts
import { Booking } from 'src/booking/booking.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import { Performance } from '../performance/performance.entity';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Performance)
  performance: Performance;

  @ManyToOne(() => Booking, (booking) => booking.seats)
  booking: Booking;

  @Column()
  seatNumber: number;

  @Column()
  grade: string;

  @Column()
  price: number;

  @Column({ default: false })
  isBooked: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
