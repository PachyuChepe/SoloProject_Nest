// src/performance/performance.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Performance } from './performance.entity';
import { Seat } from 'src/seat/seat.entity';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { UpdatePerformanceDto } from './dto/update-performance.dto';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(Performance)
    private performanceRepository: Repository<Performance>,
    @InjectRepository(Seat) // 필요한 경우 추가
    private seatRepository: Repository<Seat>,
  ) {}

  async createPerformance(
    performanceData: CreatePerformanceDto,
  ): Promise<Performance> {
    // JSON 변환 과정이 필요하지 않습니다.
    const newPerformance = this.performanceRepository.create(performanceData);
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
    const performance = await this.performanceRepository.findOneBy({ id });
    if (!performance) {
      throw new NotFoundException(`ID ${id}의 공연을 찾을 수 없습니다.`);
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
