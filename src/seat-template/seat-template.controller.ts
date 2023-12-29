// src/seat-template/seat-template.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { SeatTemplateService } from './seat-template.service';
import { CreateSeatTemplateDto } from './dto/create-seat-template.dto';

@Controller('seat-templates')
export class SeatTemplateController {
  constructor(private seatTemplateService: SeatTemplateService) {}

  @Post()
  async createSeatTemplate(
    @Body() createSeatTemplateDto: CreateSeatTemplateDto,
  ) {
    return this.seatTemplateService.createSeatTemplate(createSeatTemplateDto);
  }

  // 기타 엔드포인트들...
}
