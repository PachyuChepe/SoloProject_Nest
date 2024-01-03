// src/user/dto/update-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(6)
  @IsOptional() // 선택적 필드로 설정
  @ApiProperty({
    example: 'password123',
    description: '비밀번호 (최소 6자)',
    required: false,
  })
  currentPassword?: string;

  @IsString()
  @MinLength(6)
  @IsOptional() // 선택적 필드로 설정
  @ApiProperty({
    example: 'password123',
    description: '비밀번호 (최소 6자)',
    required: false,
  })
  newPassword?: string; // 새로운 비밀번호 필드 추가

  @IsString()
  @IsOptional() // 선택적 필드로 설정
  @ApiProperty({ example: 'nickname', description: '닉네임', required: false })
  nickname?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '010-1234-5678',
    description: '전화번호',
    required: false,
  })
  call?: string;
}
