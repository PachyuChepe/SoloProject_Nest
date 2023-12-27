// src/seat/seat.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from './seat.entity';
import { CreateSeatDto } from './dto/create-seat.dto';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
  ) {}

  // 좌석 생성
  async createSeat(createSeatDto: CreateSeatDto): Promise<Seat> {
    const seat = this.seatRepository.create(createSeatDto);
    return this.seatRepository.save(seat);
  }

  // 좌석 조회
  async findSeatsByPerformance(performanceId: number): Promise<Seat[]> {
    return this.seatRepository.find({
      where: { performance: { id: performanceId }, isBooked: false },
    });
  }
  // CRUD & 비즈니스 로직 작성
}
