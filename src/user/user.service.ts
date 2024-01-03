// src/user/user.service.ts
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, nickname, call, points, isAdmin } = createUserDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('이미 가입된 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      nickname,
      call,
      points: points !== undefined ? points : 1000000,
      isAdmin: isAdmin || false,
    });
    return this.userRepository.save(newUser);
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async updateUser(
    email: string,
    updateData: {
      currentPassword?: string;
      newPassword?: string;
      nickname?: string;
      call?: string;
    },
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
    }

    if (!updateData.currentPassword) {
      throw new UnauthorizedException('기존 비밀번호를 입력해주세요.');
    }

    if (
      updateData.currentPassword &&
      !(await bcrypt.compare(updateData.currentPassword, user.password))
    ) {
      throw new UnauthorizedException('현재 비밀번호가 일치하지 않습니다.');
    }

    if (updateData.newPassword) {
      const hashedPassword = await bcrypt.hash(updateData.newPassword, 10);
      user.password = hashedPassword;
    }

    if (updateData.nickname) {
      user.nickname = updateData.nickname;
    }

    if (updateData.call) {
      user.call = updateData.call;
    }

    return this.userRepository.save(user);
  }

  async deleteUser(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
    }

    await this.userRepository.remove(user);
  }
}
