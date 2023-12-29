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

@Controller('bookings')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createBooking(@Body() createBookingDto: CreateBookingDto, @Req() req) {
    return this.bookingService.createBooking(createBookingDto, req.user);
  }

  @Get('my-bookings')
  @UseGuards(AuthGuard('jwt'))
  async getUserBookingsWithDetails(@Req() req) {
    return this.bookingService.getUserBookingsWithDetails(req.user.id);
  }

  @Delete(':id/cancel')
  @UseGuards(AuthGuard('jwt'))
  async cancelBooking(@Param('id') bookingId: number, @Req() req) {
    await this.bookingService.cancelBooking(bookingId, req.user.id);
    return { message: '예매가 취소되었습니다.' };
  }
}
