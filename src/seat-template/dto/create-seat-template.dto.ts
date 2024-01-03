// src/seat-template/dto/create-seat-template.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsArray, ValidateNested, IsNumber } from 'class-validator';

class GradeConfigurationDto {
  @IsString()
  @ApiProperty({ example: 'VIP', description: '좌석 등급' })
  grade: string;

  @IsNumber()
  @ApiProperty({ example: 50, description: '좌석 수' })
  seatCount: number;

  @IsNumber()
  @ApiProperty({ example: 200000, description: '가격' })
  price: number;
}

export class CreateSeatTemplateDto {
  @IsString()
  @ApiProperty({ example: '메인 홀', description: '템플릿 이름' })
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GradeConfigurationDto)
  @ApiProperty({ type: [GradeConfigurationDto], description: '좌석 구성 정보' })
  configuration: GradeConfigurationDto[];
}
