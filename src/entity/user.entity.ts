// src/entity/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column({ default: 1000000 })
  points: number;

  @Column({ default: false })
  isAdmin: boolean;
}
