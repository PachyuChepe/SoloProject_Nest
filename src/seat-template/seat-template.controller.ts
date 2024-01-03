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
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { AdminGuard } from '../auth/guard/admin-auth.guard';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

import { CreateSeatTemplateDto } from './dto/create-seat-template.dto';
import { UpdateSeatTemplateDto } from './dto/update-seat-template.dto';
import { SeatTemplateService } from './seat-template.service';

@ApiTags('template')
@Controller('template')
export class SeatTemplateController {
  constructor(private seatTemplateService: SeatTemplateService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '좌석 템플릿 생성',
    description: '새로운 좌석 템플릿을 생성합니다.',
  })
  @ApiResponse({ status: 201, description: '좌석 템플릿 생성 성공' })
  @ApiBody({ type: CreateSeatTemplateDto })
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
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '모든 좌석 템플릿 조회',
    description: '시스템에 등록된 모든 좌석 템플릿을 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '좌석 템플릿 조회 성공' })
  async getAllSeatTemplates() {
    const templates = await this.seatTemplateService.findAll();
    return { message: '좌석 템플릿 전체 조회 성공', templates };
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '좌석 템플릿 상세 조회',
    description: '특정 ID의 좌석 템플릿을 상세 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '좌석 템플릿 상세 조회 성공' })
  @ApiResponse({ status: 404, description: '좌석 템플릿을 찾을 수 없음' })
  @ApiParam({ name: 'id', type: 'number', description: '좌석 템플릿 ID' })
  async getSeatTemplateById(@Param('id') id: number) {
    const template = await this.seatTemplateService.findOne(id);
    return { message: '좌석 템플릿 상세 조회 성공', template };
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '좌석 템플릿 수정',
    description: '특정 ID의 좌석 템플릿을 수정합니다.',
  })
  @ApiResponse({ status: 200, description: '좌석 템플릿 수정 성공' })
  @ApiResponse({ status: 404, description: '좌석 템플릿을 찾을 수 없음' })
  @ApiParam({ name: 'id', type: 'number', description: '좌석 템플릿 ID' })
  @ApiBody({ type: UpdateSeatTemplateDto })
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

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '좌석 템플릿 삭제',
    description: '특정 좌석 템플릿을 삭제합니다.',
  })
  @ApiResponse({ status: 200, description: '삭제 성공' })
  @ApiResponse({ status: 404, description: '템플릿을 찾을 수 없음' })
  @ApiParam({ name: 'id', type: 'number', description: '좌석 템플릿 ID' })
  async deleteSeatTemplate(@Param('id') id: number) {
    await this.seatTemplateService.remove(id);
    return { message: '좌석 템플릿 삭제 완료' };
  }
}
