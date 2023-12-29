// src/performance/performance.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  UnauthorizedException,
  Get,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { UpdatePerformanceDto } from './dto/update-performance.dto';
import { SearchPerformanceDto } from './dto/search-performance.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('performances')
export class PerformanceController {
  constructor(private performanceService: PerformanceService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  async createPerformance(
    @Body() performanceData: CreatePerformanceDto,
    @Req() req,
  ) {
    const user = req.user;
    if (!user.isAdmin) {
      throw new UnauthorizedException('관리자만 공연을 생성할 수 있습니다.');
    }
    return this.performanceService.createPerformance(performanceData);
  }

  @Get()
  async getAllPerformances() {
    return this.performanceService.findAllPerformances();
  }

  @Get(':id')
  async getPerformanceById(@Param('id') id: number) {
    console.log('아니 진짜 니가 검색으로 동작한다고?');
    return this.performanceService.findPerformanceById(id);
  }

  @Get(':id/detail')
  async getPerformanceDetails(@Param('id') id: number) {
    return this.performanceService.getPerformanceDetails(id);
  }

  @Get('show/search')
  async searchPerformances(@Query() searchParams: SearchPerformanceDto) {
    console.log('검색 파라미터:', searchParams);
    return this.performanceService.searchPerformances(searchParams);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  async updatePerformance(
    @Param('id') id: number,
    @Body() updateData: UpdatePerformanceDto,
    @Req() req,
  ) {
    const user = req.user;
    if (!user.isAdmin) {
      throw new UnauthorizedException(
        '관리자만 공연 정보를 수정할 수 있습니다.',
      );
    }
    return this.performanceService.updatePerformance(id, updateData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  async deletePerformance(@Param('id') id: number, @Req() req) {
    const user = req.user;
    if (!user.isAdmin) {
      throw new UnauthorizedException('관리자만 공연을 삭제할 수 있습니다.');
    }
    await this.performanceService.deletePerformance(id);
    return { message: `ID ${id}의 공연이 성공적으로 삭제되었습니다.` };
  }
}
