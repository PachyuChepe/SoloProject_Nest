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
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PerformanceService } from './performance.service';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { UpdatePerformanceDto } from './dto/update-performance.dto';
import { SearchPerformanceDto } from './dto/search-performance.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('performance')
export class PerformanceController {
  constructor(private performanceService: PerformanceService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async createPerformance(
    @UploadedFile() image: Express.Multer.File,
    @Body() performanceData: CreatePerformanceDto,
    @Req() req,
  ) {
    // schedule 필드가 문자열인 경우 JSON 객체로 변환
    if (typeof performanceData.schedule === 'string') {
      try {
        performanceData.schedule = JSON.parse(performanceData.schedule);
      } catch (error) {
        throw new BadRequestException('Invalid schedule format');
      }
    }

    const user = req.user;
    if (!user.isAdmin) {
      throw new UnauthorizedException('관리자만 공연을 생성할 수 있습니다.');
    }
    if (image) {
      const imageUrl =
        await this.performanceService.uploadImageToCloudflare(image);
      performanceData.imageUrl = imageUrl;
    }
    return this.performanceService.createPerformance(performanceData);
  }

  @Get()
  async getAllPerformances() {
    return this.performanceService.findAllPerformances();
  }

  @Get('/:id')
  async getPerformanceById(@Param('id') id: number) {
    return this.performanceService.findPerformanceById(id);
  }

  @Get('/detail/:id')
  async getPerformanceDetails(@Param('id') id: number) {
    return this.performanceService.getPerformanceDetails(id);
  }

  @Get('/detailed/search')
  async searchPerformances(@Query() searchParams: SearchPerformanceDto) {
    return this.performanceService.searchPerformances(searchParams);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async updatePerformance(
    @Param('id') id: number,
    @Body() updateData: UpdatePerformanceDto,
    @Req() req,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    // schedule 필드가 문자열인 경우 JSON 객체로 변환
    if (typeof updateData.schedule === 'string') {
      try {
        updateData.schedule = JSON.parse(updateData.schedule);
      } catch (error) {
        throw new BadRequestException('Invalid schedule format');
      }
    }

    const user = req.user;
    if (!user.isAdmin) {
      throw new UnauthorizedException(
        '관리자만 공연 정보를 수정할 수 있습니다.',
      );
    }
    return this.performanceService.updatePerformance(id, updateData, image);
  }

  @Delete('/:id')
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
