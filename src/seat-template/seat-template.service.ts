// src/seat-template/seat-template.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeatTemplate } from './seat-template.entity';
import { CreateSeatTemplateDto } from './dto/create-seat-template.dto';

@Injectable()
export class SeatTemplateService {
  constructor(
    @InjectRepository(SeatTemplate)
    private seatTemplateRepository: Repository<SeatTemplate>,
  ) {}

  async createSeatTemplate(
    createSeatTemplateDto: CreateSeatTemplateDto,
  ): Promise<SeatTemplate> {
    const seatTemplate = this.seatTemplateRepository.create(
      createSeatTemplateDto,
    );
    return this.seatTemplateRepository.save(seatTemplate);
  }

  // 기타 필요한 메서드들...
}
