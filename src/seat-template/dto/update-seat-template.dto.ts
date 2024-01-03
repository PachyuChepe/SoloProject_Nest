// src/seat-template/dto/update-seat-template.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsArray,
  ValidateNested,
  IsOptional,
  IsNumber,
} from 'class-validator';

class GradeConfigurationDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'VIP', description: '좌석 등급' })
  grade?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 50, description: '좌석 수', required: false })
  seatCount?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 200000, description: '가격', required: false })
  price?: number;
}

export class UpdateSeatTemplateDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '메인 홀',
    description: '템플릿 이름',
    required: false,
  })
  name?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GradeConfigurationDto)
  @IsOptional()
  @ApiProperty({
    type: [GradeConfigurationDto],
    description: '좌석 구성 정보',
    required: false,
  })
  configuration?: GradeConfigurationDto[];
}
