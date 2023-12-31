// src/performance/performance.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as FormData from 'form-data';
import { Seat } from 'src/seat/seat.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { SeatTemplate } from '../seat-template/seat-template.entity';

import { CreatePerformanceDto } from './dto/create-performance.dto';
import { SearchPerformanceDto } from './dto/search-performance.dto';
import { UpdatePerformanceDto } from './dto/update-performance.dto';
import { Performance } from './performance.entity';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(Performance)
    private performanceRepository: Repository<Performance>,
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
    @InjectRepository(SeatTemplate)
    private seatTemplateRepository: Repository<SeatTemplate>,
    private configService: ConfigService,
  ) {}

  async uploadImageToCloudflare(
    imageFile: Express.Multer.File,
  ): Promise<string> {
    const uniqueFilename = `${uuidv4()}-${imageFile.originalname}`;
    const formData = new FormData();
    formData.append('file', imageFile.buffer, {
      filename: uniqueFilename,
      contentType: imageFile.mimetype,
    });

    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/accounts/${this.configService.get(
        'ACCOUNT_ID',
      )}/images/v1`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${this.configService.get('API_TOKEN')}`,
        },
      },
    );

    if (response.status === 200 && response.data.success) {
      return response.data.result.variants[0];
    } else {
      throw new Error('이미지 업로드 실패');
    }
  }

  async deleteImageFromCloudflare(imageId: string): Promise<void> {
    const response = await axios.delete(
      `https://api.cloudflare.com/client/v4/accounts/${this.configService.get(
        'ACCOUNT_ID',
      )}/images/v1/${imageId}`,
      {
        headers: {
          Authorization: `Bearer ${this.configService.get('API_TOKEN')}`,
        },
      },
    );

    if (response.status !== 200 || !response.data.success) {
      throw new Error('이미지 삭제 실패');
    }
  }

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

    const seats = await this.seatRepository.find({
      where: { performance: { id: id } },
    });

    const availableSeats = seats.filter((seat) => !seat.isBooked).length;
    const isAvailable = availableSeats > 0;

    return { ...performance, availableSeats, isAvailable };
  }

  async searchPerformances(
    searchParams: SearchPerformanceDto,
  ): Promise<Performance[]> {
    const query = this.performanceRepository.createQueryBuilder('performance');

    if (searchParams.title) {
      const formattedTitle = `%${searchParams.title.replace(/\s+/g, ' ')}%`;
      query.andWhere(
        "REPLACE(performance.name, ' ', '') LIKE REPLACE(:title, ' ', '')",
        {
          title: formattedTitle,
        },
      );
    }

    if (searchParams.category && searchParams.category !== '전체') {
      query.andWhere('performance.category = :category', {
        category: searchParams.category,
      });
    }

    return query.getMany();
  }

  async updatePerformance(
    id: number,
    updateData: UpdatePerformanceDto,
    newImageFile?: Express.Multer.File,
  ): Promise<Performance> {
    const performance = await this.performanceRepository.findOne({
      where: { id },
      relations: ['seatTemplate'],
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

    if (newImageFile) {
      const newImageUrl = await this.uploadImageToCloudflare(newImageFile);
      updateData.imageUrl = newImageUrl;
    }

    this.performanceRepository.merge(performance, updateData);
    return this.performanceRepository.save(performance);
  }

  async deletePerformance(id: number): Promise<void> {
    const result = await this.performanceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ID ${id}의 공연을 찾을 수 없습니다.`);
    }
  }
}
