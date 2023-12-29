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
    let seatNumber = 1;

    template.configuration.grades.forEach((gradeConfig) => {
      for (let i = 0; i < gradeConfig.seatCount; i++) {
        const seat = this.seatRepository.create({
          performance,
          seatNumber: seatNumber++,
          grade: gradeConfig.grade,
          price: gradeConfig.price,
          isBooked: false,
        });
        seats.push(seat);
      }
    });

    return this.seatRepository.save(seats);
  }
}
