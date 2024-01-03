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
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

import { CreatePerformanceDto } from './dto/create-performance.dto';
import { SearchPerformanceDto } from './dto/search-performance.dto';
import { UpdatePerformanceDto } from './dto/update-performance.dto';
import { PerformanceService } from './performance.service';

@ApiTags('performance')
@Controller('performance')
export class PerformanceController {
  constructor(private performanceService: PerformanceService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: '공연 생성',
    description: '새로운 공연을 생성합니다.',
  })
  @ApiResponse({ status: 201, description: '공연 생성 성공' })
  @ApiResponse({ status: 401, description: '권한 없음' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: '공연 이름',
          example: '뮤지컬 렌트',
        },
        description: {
          type: 'string',
          description: '공연 설명',
          example: '뮤지컬 렌트의 설명',
        },
        location: {
          type: 'string',
          description: '공연 장소',
          example: '서울 예술의전당',
        },
        schedule: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              date: { type: 'string', example: '2023-12-25' },
              time: { type: 'string', example: '19:00' },
            },
          },
          description: '공연 일정',
          example: [
            { date: '2023-12-29', time: '05:00' },
            { date: '2023-12-30', time: '04:13' },
            { date: '2023-12-31', time: '05:00' },
          ],
        },
        price: {
          type: 'number',
          description: '공연 가격',
          example: 50000,
        },
        category: {
          type: 'string',
          nullable: true,
          description: '공연 카테고리 (선택 사항)',
          example: '뮤지컬',
        },
        seatTemplateId: {
          type: 'number',
          nullable: true,
          description: '좌석 템플릿 ID (선택 사항)',
          example: 1,
        },
        image: {
          type: 'string',
          format: 'binary',
          description: '공연 이미지 파일. 파일 선택 버튼으로 업로드',
        },
      },
    },
  })
  async createPerformance(
    @UploadedFile() image: Express.Multer.File,
    @Body() performanceData: CreatePerformanceDto | any,
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
  @ApiOperation({
    summary: '모든 공연 조회',
    description: '시스템에 등록된 모든 공연을 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '공연 조회 성공' })
  async getAllPerformances() {
    return this.performanceService.findAllPerformances();
  }

  @Get('/:id')
  @ApiOperation({
    summary: '특정 공연 조회',
    description: 'ID를 기반으로 특정 공연을 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '공연 조회 성공' })
  @ApiResponse({ status: 404, description: '공연을 찾을 수 없음' })
  async getPerformanceById(@Param('id') id: number) {
    return this.performanceService.findPerformanceById(id);
  }

  @Get('/detail/:id')
  @ApiOperation({
    summary: '공연 상세 정보 조회',
    description: '공연의 상세 정보를 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '공연 상세 정보 조회 성공' })
  @ApiResponse({ status: 404, description: '공연을 찾을 수 없음' })
  async getPerformanceDetails(@Param('id') id: number) {
    return this.performanceService.getPerformanceDetails(id);
  }

  @Get('/detailed/search')
  @ApiOperation({
    summary: '공연 검색',
    description: '제목 또는 카테고리를 기반으로 공연을 검색합니다.',
  })
  @ApiResponse({ status: 200, description: '공연 검색 성공' })
  @ApiQuery({ name: 'title', required: false, type: String })
  @ApiQuery({ name: 'category', required: false, type: String })
  async searchPerformances(@Query() searchParams: SearchPerformanceDto) {
    return this.performanceService.searchPerformances(searchParams);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: '공연 정보 업데이트',
    description: '특정 공연의 정보를 업데이트합니다.',
  })
  @ApiResponse({ status: 200, description: '공연 정보 업데이트 성공' })
  @ApiResponse({ status: 401, description: '권한 없음' })
  @ApiResponse({ status: 404, description: '공연을 찾을 수 없음' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: '공연 이름',
          example: '뮤지컬 렌트',
        },
        description: {
          type: 'string',
          description: '공연 설명',
          example: '뮤지컬 렌트의 설명',
        },
        location: {
          type: 'string',
          description: '공연 장소',
          example: '서울 예술의전당',
        },
        schedule: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              date: { type: 'string' },
              time: { type: 'string' },
            },
          },
          description: '공연 일정',
          example: [
            { date: '2024-01-15', time: '05:00' },
            { date: '2024-02-30', time: '04:13' },
            { date: '2024-10-01', time: '05:00' },
          ],
        },
        price: {
          type: 'number',
          description: '공연 가격',
          example: 50000,
        },
        category: {
          type: 'string',
          nullable: true,
          description: '공연 카테고리 (선택 사항)',
          example: '뮤지컬',
        },
        seatTemplateId: {
          type: 'number',
          nullable: true,
          description: '좌석 템플릿 ID (선택 사항)',
          example: 1,
        },
        image: {
          type: 'string',
          format: 'binary',
          description: '공연 이미지 파일. 파일 선택 버튼으로 업로드',
        },
      },
    },
  })
  async updatePerformance(
    @Param('id') id: number,
    @Body() updateData: UpdatePerformanceDto | any,
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
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '공연 삭제',
    description: '특정 공연을 삭제합니다.',
  })
  @ApiResponse({ status: 200, description: '공연 삭제 성공' })
  @ApiResponse({ status: 401, description: '권한 없음' })
  @ApiResponse({ status: 404, description: '공연을 찾을 수 없음' })
  async deletePerformance(@Param('id') id: number, @Req() req) {
    const user = req.user;
    if (!user.isAdmin) {
      throw new UnauthorizedException('관리자만 공연을 삭제할 수 있습니다.');
    }
    await this.performanceService.deletePerformance(id);
    return { message: `ID ${id}의 공연이 성공적으로 삭제되었습니다.` };
  }
}
