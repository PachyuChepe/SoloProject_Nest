// src/entity/seat.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Performance } from './performance.entity';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Performance)
  performance: Performance;

  @Column()
  seatNumber: number;

  @Column()
  grade: string;

  @Column()
  price: number;

  @Column({ default: false })
  isBooked: boolean;
}
