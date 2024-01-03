// src/seat-template/dto/create-seat-template.dto.ts
import { Type } from 'class-transformer';
import { IsString, IsArray, ValidateNested, IsNumber } from 'class-validator';

class GradeConfigurationDto {
  @IsString()
  grade: string;

  @IsNumber()
  seatCount: number;

  @IsNumber()
  price: number;
}

export class CreateSeatTemplateDto {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GradeConfigurationDto)
  configuration: GradeConfigurationDto[];
}
