// src/user/dto/create-user.dto.ts
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
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  nickname: string;

  @IsString()
  @IsOptional()
  call?: string;

  @IsNumber()
  @IsOptional()
  points?: number;

  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;
}
