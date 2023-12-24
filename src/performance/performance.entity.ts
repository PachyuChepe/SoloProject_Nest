// src/performance/performance.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column('simple-array')
  schedule: string[];

  @Column()
  price: number;

  @Column()
  category: string;
}
