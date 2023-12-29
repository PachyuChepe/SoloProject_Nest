// src/booking/booking.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { Seat } from '../seat/seat.entity';
import { User } from '../user/user.entity';
import { Performance } from '../performance/performance.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
    @InjectRepository(Performance)
    private performanceRepository: Repository<Performance>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createBooking(
    createBookingDto: CreateBookingDto,
    user: User,
  ): Promise<Booking> {
    const performance = await this.performanceRepository.findOne({
      where: { id: createBookingDto.performanceId },
    });
    if (!performance) {
      throw new NotFoundException('공연을 찾을 수 없습니다.');
    }

    let totalCost = performance.price;
    const selectedSeats = [];

    if (
      createBookingDto.seatNumbers &&
      createBookingDto.seatNumbers.length > 0
    ) {
      for (const seatNumber of createBookingDto.seatNumbers) {
        const seat = await this.seatRepository.findOne({
          where: {
            performance: { id: performance.id },
            seatNumber,
            isBooked: false,
          },
        });
        if (!seat) {
          throw new ConflictException(
            `좌석 번호 ${seatNumber}는 예매할 수 없습니다.`,
          );
        }
        seat.isBooked = true;
        selectedSeats.push(seat);
        totalCost += seat.price;
      }
    }

    if (user.points < totalCost) {
      throw new ConflictException('포인트가 부족합니다.');
    }

    user.points -= totalCost;
    await this.userRepository.save(user);

    const booking = this.bookingRepository.create({
      user,
      performance,
      seats: selectedSeats,
      date: new Date(),
    });

    await this.seatRepository.save(selectedSeats);
    return this.bookingRepository.save(booking);
  }

  async getUserBookingsWithDetails(userId: number): Promise<any[]> {
    const bookings = await this.bookingRepository.find({
      where: { user: { id: userId } },
      relations: ['performance', 'seats'],
    });

    return bookings.map((booking) => ({
      id: booking.id,
      performance: {
        id: booking.performance.id,
        name: booking.performance.name,
        description: booking.performance.description,
        date: booking.performance.schedule, // 공연 일정
        price: booking.performance.price,
      },
      seats: booking.seats.map((seat) => ({
        seatNumber: seat.seatNumber,
        grade: seat.grade,
        price: seat.price,
      })),
      totalCost:
        booking.performance.price +
        booking.seats.reduce((sum, seat) => sum + seat.price, 0),
      bookingDate: booking.date,
    }));
  }

  async cancelBooking(bookingId: number, userId: number): Promise<void> {
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId, user: { id: userId } },
      relations: ['performance', 'seats', 'user'],
    });

    if (!booking) {
      throw new NotFoundException('예매 내역을 찾을 수 없습니다.');
    }

    // 좌석 예약 상태 해제 및 bookingId 제거
    booking.seats.forEach((seat) => {
      seat.isBooked = false;
      seat.booking = null; // 이 부분을 추가
    });
    await this.seatRepository.save(booking.seats);

    // 사용자에게 포인트 환불
    const totalRefund =
      booking.performance.price +
      booking.seats.reduce((sum, seat) => sum + seat.price, 0);
    booking.user.points += totalRefund;
    await this.userRepository.save(booking.user);

    // 예매 내역 삭제
    await this.bookingRepository.remove(booking);
  }

  // 다른 메서드들...
}
