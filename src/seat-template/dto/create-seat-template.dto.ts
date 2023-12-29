// src/seat-template/dto/create-seat-template.dto.ts
import { IsString, IsObject } from 'class-validator';

export class CreateSeatTemplateDto {
  @IsString()
  name: string;

  @IsObject()
  configuration: {
    rows: number;
    seatsPerRow: number;
    grades: string[];
  };
}
