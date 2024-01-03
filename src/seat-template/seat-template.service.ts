// src/seat-template/seat-template.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSeatTemplateDto } from './dto/create-seat-template.dto';
import { UpdateSeatTemplateDto } from './dto/update-seat-template.dto';
import { SeatTemplate } from './seat-template.entity';

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

  async findAll(): Promise<SeatTemplate[]> {
    return this.seatTemplateRepository.find();
  }

  async findOne(id: number): Promise<SeatTemplate> {
    const seatTemplate = await this.seatTemplateRepository.findOneBy({ id });
    if (!seatTemplate) {
      throw new NotFoundException(
        `ID ${id}에 해당하는 좌석 템플릿을 찾을 수 없습니다.`,
      );
    }
    return seatTemplate;
  }

  async update(
    id: number,
    updateSeatTemplateDto: UpdateSeatTemplateDto,
  ): Promise<void> {
    const existingTemplate = await this.seatTemplateRepository.findOneBy({
      id,
    });
    if (!existingTemplate) {
      throw new NotFoundException(
        `ID ${id}에 해당하는 좌석 템플릿을 찾을 수 없습니다.`,
      );
    }

    if (updateSeatTemplateDto.name) {
      existingTemplate.name = updateSeatTemplateDto.name;
    }

    if (updateSeatTemplateDto.configuration) {
      existingTemplate.configuration = {
        grades: updateSeatTemplateDto.configuration.map((gradeConfig) => ({
          grade:
            gradeConfig.grade ??
            existingTemplate.configuration.grades.find(
              (g) => g.grade === gradeConfig.grade,
            )?.grade,
          seatCount:
            gradeConfig.seatCount ??
            existingTemplate.configuration.grades.find(
              (g) => g.grade === gradeConfig.grade,
            )?.seatCount,
          price:
            gradeConfig.price ??
            existingTemplate.configuration.grades.find(
              (g) => g.grade === gradeConfig.grade,
            )?.price,
        })),
      };
    }

    await this.seatTemplateRepository.save(existingTemplate);
  }
  async remove(id: number): Promise<void> {
    const result = await this.seatTemplateRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `ID ${id}에 해당하는 좌석 템플릿을 찾을 수 없습니다.`,
      );
    }
  }
}
