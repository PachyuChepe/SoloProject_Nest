// src/booking/booking.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Performance } from '../performance/performance.entity';
import { Seat } from '../seat/seat.entity';
import { User } from '../user/user.entity';

import { Booking } from './booking.entity';
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
    return await this.bookingRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const performance = await transactionalEntityManager.findOne(
          Performance,
          {
            where: {
              id: createBookingDto.performanceId,
            },
          },
        );
        if (!performance) {
          throw new NotFoundException('공연을 찾을 수 없습니다.');
        }

        // performance.schedule이 배열인지 확인
        if (!Array.isArray(performance.schedule)) {
          throw new Error('공연 일정 데이터가 유효하지 않습니다.');
        }

        const currentDate = new Date();
        const reservationDate = new Date(
          createBookingDto.date + ' ' + createBookingDto.time,
        );

        // 입력된 예약 날짜와 시간이 공연 일정 중 하나와 일치하는지 확인
        const isScheduleMatched = performance.schedule.some((scheduleItem) => {
          const scheduleDate = new Date(
            scheduleItem.date + ' ' + scheduleItem.time,
          );
          return scheduleDate.getTime() === reservationDate.getTime();
        });

        if (!isScheduleMatched) {
          throw new ConflictException('예약할 수 없는 날짜 또는 시간입니다.');
        }

        // 공연 시작 시간이 현재 시간보다 이전인 경우 예약 불가
        if (reservationDate < currentDate) {
          throw new ConflictException('이미 공연이 종료되었습니다.');
        }

        let totalCost = performance.price;
        const selectedSeats = [];

        if (
          createBookingDto.seatNumbers &&
          createBookingDto.seatNumbers.length > 0
        ) {
          for (const seatNumber of createBookingDto.seatNumbers) {
            const seat = await transactionalEntityManager.findOne(Seat, {
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
        await transactionalEntityManager.save(User, user);
        await transactionalEntityManager.save(Seat, selectedSeats);

        const booking = transactionalEntityManager.create(Booking, {
          user,
          performance,
          seats: selectedSeats,
          date: new Date(),
        });

        return await transactionalEntityManager.save(Booking, booking);
      },
    );
  }

  async getUserBookingsWithDetails(userId: number): Promise<any[]> {
    const bookings = await this.bookingRepository.find({
      where: { user: { id: userId } },
      relations: ['performance', 'seats'],
      order: {
        date: 'DESC', // 예약 날짜 기준 내림차순 정렬
      },
    });

    return bookings.map((booking) => ({
      id: booking.id,
      performance: {
        id: booking.performance.id,
        name: booking.performance.name,
        description: booking.performance.description,
        date: booking.performance.schedule,
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

  async getBookingDetails(bookingId: number, userId: number): Promise<any> {
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId, user: { id: userId } },
      relations: ['performance', 'seats', 'user'],
    });

    if (!booking) {
      throw new NotFoundException('예매 내역을 찾을 수 없습니다.');
    }

    // 사용자가 해당 예매 내역의 소유자인지 확인
    if (booking.user.id !== userId) {
      throw new UnauthorizedException('접근 권한이 없습니다.');
    }

    return {
      id: booking.id,
      user: {
        id: booking.user.id,
        name: booking.user.nickname,
        email: booking.user.email,
      },
      performance: {
        id: booking.performance.id,
        name: booking.performance.name,
        description: booking.performance.description,
        date: booking.performance.schedule,
        price: booking.performance.price,
        imageUrl: booking.performance.imageUrl,
      },
      seats: booking.seats.map((seat) => ({
        id: seat.id,
        seatNumber: seat.seatNumber,
        grade: seat.grade,
        price: seat.price,
      })),
      bookingDate: booking.date,
      totalCost:
        booking.performance.price +
        booking.seats.reduce((sum, seat) => sum + seat.price, 0),
    };
  }

  async cancelBooking(bookingId: number, userId: number): Promise<void> {
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId, user: { id: userId } },
      relations: ['performance', 'seats', 'user'],
    });

    if (!booking) {
      throw new NotFoundException('예매 내역을 찾을 수 없습니다.');
    }

    // 공연 시작 시간 가져오기
    const performanceStartTime = new Date(
      booking.performance.schedule[0].date +
        ' ' +
        booking.performance.schedule[0].time,
    );

    // 현재 시간 가져오기
    const currentTime = new Date();

    // 3시간 이내인지 확인
    const timeDiffInHours =
      (performanceStartTime.getTime() - currentTime.getTime()) /
      (1000 * 60 * 60);

    if (timeDiffInHours < 3) {
      throw new ConflictException(
        '공연 시작 3시간 이내에는 예약을 취소할 수 없습니다.',
      );
    }

    // 좌석 예약 상태 해제 및 bookingId 제거
    booking.seats.forEach((seat) => {
      seat.isBooked = false;
      seat.booking = null;
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
}
