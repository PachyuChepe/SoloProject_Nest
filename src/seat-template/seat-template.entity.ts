// src/seat-template/seat-template.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SeatTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('json')
  configuration: {
    grades: {
      grade: string;
      seatCount: number;
      price: number;
    }[];
  };
}
