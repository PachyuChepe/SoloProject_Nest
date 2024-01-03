// src/booking/booking.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
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

import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@ApiTags('booking')
@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '예매 생성',
    description: '새로운 예매를 생성합니다.',
  })
  @ApiResponse({ status: 201, description: '예매 생성 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @ApiResponse({ status: 404, description: '공연을 찾을 수 없음' })
  @ApiBody({ type: CreateBookingDto })
  async createBooking(@Body() createBookingDto: CreateBookingDto, @Req() req) {
    return this.bookingService.createBooking(createBookingDto, req.user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '사용자 예매 내역 조회',
    description: '로그인한 사용자의 예매 내역을 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '조회 성공' })
  async getUserBookingsWithDetails(@Req() req) {
    return this.bookingService.getUserBookingsWithDetails(req.user.id);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '예매 상세 조회',
    description: '특정 예매의 상세 내역을 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '조회 성공' })
  @ApiResponse({ status: 404, description: '예매 내역을 찾을 수 없음' })
  @ApiParam({ name: 'id', type: 'number', description: '예매 ID' })
  async getBookingDetails(@Param('id') bookingId: number, @Req() req) {
    const userId = req.user.id;
    return this.bookingService.getBookingDetails(bookingId, userId);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '예매 취소',
    description: '특정 예매를 취소합니다.',
  })
  @ApiResponse({ status: 200, description: '예매 취소 성공' })
  @ApiResponse({ status: 404, description: '예매 내역을 찾을 수 없음' })
  @ApiParam({ name: 'id', type: 'number', description: '예매 ID' })
  async cancelBooking(@Param('id') bookingId: number, @Req() req) {
    await this.bookingService.cancelBooking(bookingId, req.user.id);
    return { message: '예매가 취소되었습니다.' };
  }
}
