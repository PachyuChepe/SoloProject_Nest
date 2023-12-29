// src/performance/performance.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Performance } from './performance.entity';
import { Seat } from 'src/seat/seat.entity';
import { SeatTemplate } from '../seat-template/seat-template.entity';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { UpdatePerformanceDto } from './dto/update-performance.dto';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(Performance)
    private performanceRepository: Repository<Performance>,
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
    @InjectRepository(SeatTemplate)
    private seatTemplateRepository: Repository<SeatTemplate>,
  ) {}

  async createPerformance(
    performanceData: CreatePerformanceDto,
  ): Promise<Performance> {
    let seatTemplate = null;
    if (performanceData.seatTemplateId) {
      seatTemplate = await this.seatTemplateRepository.findOne({
        where: { id: performanceData.seatTemplateId },
      });
      if (!seatTemplate) {
        throw new NotFoundException('좌석 템플릿을 찾을 수 없습니다.');
      }
    }

    const newPerformance = this.performanceRepository.create({
      ...performanceData,
      seatTemplate: seatTemplate,
    });

    return this.performanceRepository.save(newPerformance);
  }

  async findAllPerformances(): Promise<Performance[]> {
    return await this.performanceRepository.find();
  }

  async findPerformanceById(id: number): Promise<Performance | undefined> {
    return await this.performanceRepository.findOneBy({ id });
  }

  async getPerformanceDetails(id: number): Promise<any> {
    const performance = await this.performanceRepository.findOne({
      where: { id },
      relations: ['seatTemplate'],
    });

    if (!performance) {
      throw new NotFoundException(`ID ${id}의 공연을 찾을 수 없습니다.`);
    }

    // 좌석 정보와 예매 가능 여부 확인
    const seats = await this.seatRepository.find({
      where: { performance: { id: id } },
    });

    const availableSeats = seats.filter((seat) => !seat.isBooked).length;
    const isAvailable = availableSeats > 0;

    return { ...performance, availableSeats, isAvailable };
  }

  async updatePerformance(
    id: number,
    updateData: UpdatePerformanceDto,
  ): Promise<Performance> {
    const performance = await this.performanceRepository.findOne({
      where: { id },
      relations: ['seatTemplate'], // seatTemplate 관계 포함
    });

    if (!performance) {
      throw new NotFoundException(`ID ${id}의 공연을 찾을 수 없습니다.`);
    }

    if (updateData.seatTemplateId !== undefined) {
      const seatTemplate = await this.seatTemplateRepository.findOneBy({
        id: updateData.seatTemplateId,
      });
      if (!seatTemplate && updateData.seatTemplateId !== null) {
        throw new NotFoundException('좌석 템플릿을 찾을 수 없습니다.');
      }
      performance.seatTemplate = seatTemplate || null;
    }

    // 기존 값에 덮어씌우기
    this.performanceRepository.merge(performance, updateData);
    return this.performanceRepository.save(performance);
  }

  async deletePerformance(id: number): Promise<void> {
    const result = await this.performanceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ID ${id}의 공연을 찾을 수 없습니다.`);
    }
  }

  // 기타 필요한 메서드들...
}
