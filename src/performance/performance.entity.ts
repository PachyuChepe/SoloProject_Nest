// src/performance/performance.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import { SeatTemplate } from '../seat-template/seat-template.entity';

@Entity()
export class Performance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column({ type: 'json' }) // JSON 타입으로 변경
  schedule: ScheduleDto[];

  @Column()
  price: number;

  @Column({ type: 'text' })
  imageUrl: string;

  @Column()
  category: string;

  @ManyToOne(() => SeatTemplate)
  seatTemplate: SeatTemplate;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

class ScheduleDto {
  date: string;
  time: string;
}
