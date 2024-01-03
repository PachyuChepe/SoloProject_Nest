// src/user/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ example: 'user@example.com', description: '사용자 이메일' })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ example: 'password123', description: '비밀번호 (최소 6자)' })
  password: string;

  @IsString()
  @ApiProperty({ example: 'nickname', description: '닉네임' })
  nickname: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '010-1234-5678',
    description: '전화번호',
    required: false,
  })
  call?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 1000000, description: '포인트', required: false })
  points?: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: false, description: '관리자 여부', required: false })
  isAdmin?: boolean;
}
