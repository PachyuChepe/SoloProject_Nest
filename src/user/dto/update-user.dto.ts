// src/user/dto/update-user.dto.ts
import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(6)
  @IsOptional() // 선택적 필드로 설정
  currentPassword?: string;

  @IsString()
  @IsOptional() // 선택적 필드로 설정
  newPassword?: string; // 새로운 비밀번호 필드 추가

  @IsString()
  @IsOptional() // 선택적 필드로 설정
  nickname?: string;
}
