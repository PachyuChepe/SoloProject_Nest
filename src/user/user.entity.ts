// src/user/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string; // 사용자 이메일

  @Column()
  password: string; // 사용자 비밀번호

  @Column()
  nickname: string; // 사용자 닉네임

  @Column({ nullable: true })
  call?: string; // 사용자 전화번호 (선택 사항)

  @Column({ default: 1000000 })
  points: number; // 사용자가 가진 포인트, 기본값 1000000

  @Column({ default: false })
  isAdmin: boolean; // 사용자가 관리자인지 여부, 기본값 false

  @Column({ nullable: true, length: 30 })
  snsId?: string; // SNS ID (선택 사항)

  @Column({ default: 'local' })
  provider: string; // 인증 제공자 (예: local, kakao)

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
