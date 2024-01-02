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
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('bookings')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  async createBooking(@Body() createBookingDto: CreateBookingDto, @Req() req) {
    return this.bookingService.createBooking(createBookingDto, req.user);
  }

  @Get('my-bookings')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  async getUserBookingsWithDetails(@Req() req) {
    return this.bookingService.getUserBookingsWithDetails(req.user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  async getBookingDetails(@Param('id') bookingId: number, @Req() req) {
    const userId = req.user.id;
    return this.bookingService.getBookingDetails(bookingId, userId);
  }

  @Delete(':id/cancel')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  async cancelBooking(@Param('id') bookingId: number, @Req() req) {
    await this.bookingService.cancelBooking(bookingId, req.user.id);
    return { message: '예매가 취소되었습니다.' };
  }
}
