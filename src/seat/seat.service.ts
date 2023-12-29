// src/seat/seat.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from './seat.entity';
import { Performance } from '../performance/performance.entity';
import { SeatTemplate } from 'src/seat-template/seat-template.entity';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
    @InjectRepository(Performance)
    private performanceRepository: Repository<Performance>,
    @InjectRepository(SeatTemplate)
    private seatTemplateRepository: Repository<SeatTemplate>,
  ) {}

  async createSeatsFromTemplate(
    performanceId: number,
    templateId: number,
  ): Promise<Seat[]> {
    const performance = await this.performanceRepository.findOneBy({
      id: performanceId,
    });
    if (!performance) {
      throw new NotFoundException(
        `Performance with ID ${performanceId} not found`,
      );
    }

    const template = await this.seatTemplateRepository.findOneBy({
      id: templateId,
    });
    if (!template) {
      throw new NotFoundException(
        `Seat template with ID ${templateId} not found`,
      );
    }

    const seats = [];
    for (let row = 1; row <= template.configuration.rows; row++) {
      for (
        let seatNum = 1;
        seatNum <= template.configuration.seatsPerRow;
        seatNum++
      ) {
        const seat = this.seatRepository.create({
          performance,
          seatNumber: seatNum,
          grade: template.configuration.grades[row - 1], // 예를 들어 각 열에 대한 등급
          price: 0, // 가격 설정 로직 필요
          isBooked: false,
        });
        seats.push(seat);
      }
    }

    return this.seatRepository.save(seats);
  }

  // CRUD & 비즈니스 로직 작성
}
