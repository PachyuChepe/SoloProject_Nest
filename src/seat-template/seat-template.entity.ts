// src/seat-template/seat-template.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SeatTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // 템플릿 이름

  @Column('json')
  configuration: {
    rows: number;
    seatsPerRow: number;
    grades: string[];
  };
}
