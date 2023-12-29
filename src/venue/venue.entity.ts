import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Venue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // 공연장 이름

  @Column()
  location: string; // 공연장 위치

  // 공연장의 좌석 구성을 JSON 형태로 저장
  @Column('json')
  seatConfiguration: {
    rows: number;
    seatsPerRow: number;
    grades: string[]; // 각 좌석 등급 (예: A, B, VIP 등)
  };
}
