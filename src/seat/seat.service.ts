// src/seat/seat.service.ts
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeatTemplate } from 'src/seat-template/seat-template.entity';
import { Repository } from 'typeorm';

import { Performance } from '../performance/performance.entity';

import { Seat } from './seat.entity';

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
    const existingSeats = await this.seatRepository.find({
      where: { performance: { id: performanceId } },
    });
    if (existingSeats.length > 0) {
      throw new ConflictException('해당 공연에 이미 좌석이 생성되어 있습니다.');
    }

    const performance = await this.performanceRepository.findOneBy({
      id: performanceId,
    });
    if (!performance) {
      throw new NotFoundException(
        `ID ${performanceId}에 해당하는 공연을 찾을 수 없습니다.`,
      );
    }

    const template = await this.seatTemplateRepository.findOneBy({
      id: templateId,
    });
    if (!template) {
      throw new NotFoundException(
        `ID ${templateId}에 해당하는 좌석 템플릿을 찾을 수 없습니다.`,
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

  async findAllSeatsByPerformance(performanceId: number): Promise<Seat[]> {
    const seats = await this.seatRepository.find({
      where: { performance: { id: performanceId } },
    });

    // 공연에 할당된 좌석이 없는 경우 에러 처리
    if (!seats || seats.length === 0) {
      throw new NotFoundException(
        `ID ${performanceId} 공연에 할당된 좌석이 없습니다.`,
      );
    }

    return seats;
  }

  async findSeatById(seatId: number): Promise<Seat> {
    const seat = await this.seatRepository.findOneBy({ id: seatId });
    if (!seat) {
      throw new NotFoundException(
        `ID ${seatId}에 해당하는 좌석을 찾을 수 없습니다.`,
      );
    }
    return seat;
  }

  async updateSeat(seatId: number, updateData: any): Promise<void> {
    const seat = await this.seatRepository.findOneBy({ id: seatId });
    if (!seat) {
      throw new NotFoundException(
        `ID ${seatId}에 해당하는 좌석을 찾을 수 없습니다.`,
      );
    }

    if (seat.isBooked) {
      throw new Error('예매된 좌석은 수정할 수 없습니다.');
    }

    this.seatRepository.merge(seat, updateData);
    await this.seatRepository.save(seat);
  }

  async deleteSeat(seatId: number): Promise<void> {
    const seat = await this.seatRepository.findOneBy({ id: seatId });
    if (!seat) {
      throw new NotFoundException(
        `ID ${seatId}에 해당하는 좌석을 찾을 수 없습니다.`,
      );
    }

    if (seat.isBooked) {
      throw new Error('예매된 좌석은 삭제할 수 없습니다.');
    }

    await this.seatRepository.remove(seat);
  }

  async updateSeatsFromTemplate(
    performanceId: number,
    templateId: number,
  ): Promise<Seat[]> {
    const bookedSeats = await this.seatRepository.find({
      where: { performance: { id: performanceId }, isBooked: true },
    });
    if (bookedSeats.length > 0) {
      throw new BadRequestException('예매된 좌석이 있어 수정할 수 없습니다.');
    }

    await this.seatRepository.delete({ performance: { id: performanceId } });
    return this.createSeatsFromTemplate(performanceId, templateId);
  }

  async deleteSeatsByPerformance(performanceId: number): Promise<void> {
    await this.seatRepository.delete({ performance: { id: performanceId } });
  }
}
