// src/seat-template/dto/update-seat-template.dto.ts
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
  grade?: string;

  @IsNumber()
  @IsOptional()
  seatCount?: number;

  @IsNumber()
  @IsOptional()
  price?: number;
}

export class UpdateSeatTemplateDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GradeConfigurationDto)
  @IsOptional()
  configuration?: GradeConfigurationDto[];
}
