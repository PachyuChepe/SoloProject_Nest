// src/performance/performance.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { Venue } from '../venue/venue.entity';
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
}

class ScheduleDto {
  date: string;
  time: string;
}
