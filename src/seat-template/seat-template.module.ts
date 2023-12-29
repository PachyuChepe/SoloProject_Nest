// src/seat-template/seat-template.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatTemplate } from './seat-template.entity';
import { SeatTemplateService } from './seat-template.service';
import { SeatTemplateController } from './seat-template.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SeatTemplate])],
  providers: [SeatTemplateService],
  controllers: [SeatTemplateController],
})
export class SeatTemplateModule {}
