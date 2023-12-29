// src/booking/booking.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  // async bookSeats(
  //   performanceId: number,
  //   seatNumbers: number[],
  // ): Promise<Booking[]> {
  //   // 공연 정보 및 좌석 구성 확인
  //   // 이미 예매된 좌석은 걸러내고
  //   // 예매 가능한 좌석에 대해 Booking 엔티티 생성 및 저장
  // }
}
