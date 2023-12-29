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
    // DTO에서 엔티티로 데이터 변환
    const seatTemplateData = {
      name: createSeatTemplateDto.name,
      configuration: {
        grades: createSeatTemplateDto.configuration.map((gradeConfig) => ({
          grade: gradeConfig.grade,
          seatCount: gradeConfig.seatCount,
          price: gradeConfig.price,
        })),
      },
    };

    const seatTemplate = this.seatTemplateRepository.create(seatTemplateData);
    return this.seatTemplateRepository.save(seatTemplate);
  }
}
