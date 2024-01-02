// src/seat-template/seat-template.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SeatTemplateService } from './seat-template.service';
import { CreateSeatTemplateDto } from './dto/create-seat-template.dto';
import { UpdateSeatTemplateDto } from './dto/update-seat-template.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { AdminGuard } from '../auth/guard/admin-auth.guard';

@Controller('seat-templates')
export class SeatTemplateController {
  constructor(private seatTemplateService: SeatTemplateService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, AdminGuard)
  async createSeatTemplate(
    @Body() createSeatTemplateDto: CreateSeatTemplateDto,
  ) {
    const createdTemplate = await this.seatTemplateService.createSeatTemplate(
      createSeatTemplateDto,
    );
    return { message: '좌석 템플릿 생성 완료', template: createdTemplate };
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, AdminGuard)
  async getAllSeatTemplates() {
    const templates = await this.seatTemplateService.findAll();
    return { message: '좌석 템플릿 전체 조회 성공', templates };
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, AdminGuard)
  async getSeatTemplateById(@Param('id') id: number) {
    const template = await this.seatTemplateService.findOne(id);
    return { message: '좌석 템플릿 상세 조회 성공', template };
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, AdminGuard)
  async updateSeatTemplate(
    @Param('id') id: number,
    @Body() updateSeatTemplateDto: UpdateSeatTemplateDto,
  ) {
    const template = await this.seatTemplateService.update(
      id,
      updateSeatTemplateDto,
    );
    return { message: '좌석 템플릿 수정 완료', template };
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, AdminGuard)
  async deleteSeatTemplate(@Param('id') id: number) {
    await this.seatTemplateService.remove(id);
    return { message: '좌석 템플릿 삭제 완료' };
  }
}
