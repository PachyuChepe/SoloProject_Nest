// src/performance/performance.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { Venue } from '../venue/venue.entity';
import { SeatTemplate } from '../seat-template/seat-template.entity';

@Entity()
export class Performance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // 공연 이름

  @Column()
  description: string; // 공연 설명

  @Column()
  location: string; // 공연 장소

  @Column('simple-array')
  schedule: string[]; // 공연 일정, 여러 날짜를 배열로 저장

  @Column()
  price: number; // 공연 가격

  @Column({ type: 'text' })
  imageUrl: string;

  @Column()
  category: string; // 공연 카테고리

  @ManyToOne(() => SeatTemplate)
  seatTemplate: SeatTemplate;
}
