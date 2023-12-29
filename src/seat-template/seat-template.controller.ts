// src/seat-template/seat-template.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { SeatTemplateService } from './seat-template.service';
import { CreateSeatTemplateDto } from './dto/create-seat-template.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('seat-templates')
export class SeatTemplateController {
  constructor(private seatTemplateService: SeatTemplateService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  async createSeatTemplate(
    @Body() createSeatTemplateDto: CreateSeatTemplateDto,
    @Req() req,
  ) {
    if (!req.user.isAdmin) {
      throw new UnauthorizedException('관리자 권한이 필요합니다.');
    }

    return this.seatTemplateService.createSeatTemplate(createSeatTemplateDto);
  }
}
