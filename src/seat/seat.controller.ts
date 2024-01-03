// src/seat/seat.controller.ts
import {
  Controller,
  Post,
  Param,
  UseGuards,
  Delete,
  Patch,
  Get,
  Body,
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

import { SeatService } from './seat.service';

@ApiTags('seat')
@Controller('seat')
export class SeatController {
  constructor(private seatService: SeatService) {}

  @Post('/performance/:performanceId/template/:templateId')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '공연별 좌석 생성',
    description: '템플릿을 사용하여 공연별 좌석을 생성합니다.',
  })
  @ApiResponse({ status: 201, description: '좌석 생성 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @ApiParam({ name: 'performanceId', type: Number, description: '공연 ID' })
  @ApiParam({ name: 'templateId', type: Number, description: '좌석 템플릿 ID' })
  async createSeatsFromTemplate(
    @Param('performanceId') performanceId: number,
    @Param('templateId') templateId: number,
  ) {
    await this.seatService.createSeatsFromTemplate(performanceId, templateId);
    return {
      message: '좌석이 성공적으로 생성되었습니다.',
      performanceId,
      templateId,
    };
  }

  @Get('/performance/:performanceId')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '공연별 좌석 조회',
    description: '특정 공연의 모든 좌석 정보를 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '좌석 조회 성공' })
  @ApiResponse({ status: 404, description: '좌석 정보를 찾을 수 없음' })
  @ApiParam({ name: 'performanceId', type: Number, description: '공연 ID' })
  async getSeatsByPerformance(@Param('performanceId') performanceId: number) {
    const seats =
      await this.seatService.findAllSeatsByPerformance(performanceId);
    return { message: '좌석 전체 조회 성공', seats };
  }

  @Get('/:seatId')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '좌석 상세 조회',
    description: '특정 좌석의 상세 정보를 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '좌석 상세 조회 성공' })
  @ApiResponse({ status: 404, description: '좌석 정보를 찾을 수 없음' })
  @ApiParam({ name: 'seatId', type: Number, description: '좌석 ID' })
  async getSeatById(@Param('seatId') seatId: number) {
    const seat = await this.seatService.findSeatById(seatId);
    return { message: '좌석 상세 조회 성공', seat };
  }

  @Patch('/:seatId')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '좌석 정보 수정',
    description: '특정 좌석의 정보를 수정합니다.',
  })
  @ApiResponse({ status: 200, description: '좌석 수정 성공' })
  @ApiResponse({ status: 404, description: '좌석 정보를 찾을 수 없음' })
  @ApiParam({ name: 'seatId', type: Number, description: '좌석 ID' })
  @ApiBody({ type: Object, description: '업데이트할 좌석 정보' })
  async updateSeat(@Param('seatId') seatId: number, @Body() updateData: any) {
    await this.seatService.updateSeat(seatId, updateData);
    return { message: '좌석 수정 완료', seatId };
  }

  @Delete('/:seatId')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '좌석 삭제',
    description: '특정 좌석을 삭제합니다.',
  })
  @ApiResponse({ status: 200, description: '좌석 삭제 성공' })
  @ApiResponse({ status: 404, description: '좌석 정보를 찾을 수 없음' })
  @ApiParam({ name: 'seatId', type: Number, description: '좌석 ID' })
  async deleteSeat(@Param('seatId') seatId: number) {
    await this.seatService.deleteSeat(seatId);
    return { message: '좌석 삭제 완료', seatId };
  }

  @Patch('/performance/:performanceId/template/:templateId')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '템플릿 기반 좌석 업데이트',
    description: '특정 공연의 좌석을 템플릿에 따라 업데이트합니다.',
  })
  @ApiResponse({ status: 200, description: '좌석 업데이트 성공' })
  @ApiResponse({ status: 404, description: '공연 또는 템플릿을 찾을 수 없음' })
  @ApiParam({ name: 'performanceId', type: Number, description: '공연 ID' })
  @ApiParam({ name: 'templateId', type: Number, description: '좌석 템플릿 ID' })
  async updateSeatsFromTemplate(
    @Param('performanceId') performanceId: number,
    @Param('templateId') templateId: number,
  ) {
    await this.seatService.updateSeatsFromTemplate(performanceId, templateId);
    return {
      message: '좌석이 성공적으로 업데이트되었습니다.',
      performanceId,
      templateId,
    };
  }

  @Delete('/performance/:performanceId')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '공연별 좌석 삭제',
    description: '특정 공연에 할당된 모든 좌석을 삭제합니다.',
  })
  @ApiResponse({ status: 200, description: '공연별 좌석 삭제 성공' })
  @ApiResponse({ status: 404, description: '공연을 찾을 수 없음' })
  @ApiParam({ name: 'performanceId', type: Number, description: '공연 ID' })
  async deleteSeatsByPerformance(
    @Param('performanceId') performanceId: number,
  ) {
    await this.seatService.deleteSeatsByPerformance(performanceId);
    return {
      message: '공연에 할당된 전체 좌석이 삭제되었습니다.',
      performanceId,
    };
  }
}
