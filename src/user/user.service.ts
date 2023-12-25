// src/user/user.service.ts
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, nickname } = createUserDto;

    // 이메일 중복 검사
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
    });
    return this.userRepository.save(newUser);
  }

  // 사용자 이메일로 사용자 정보 조회
  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async updateUser(
    email: string,
    updateData: {
      currentPassword?: string;
      newPassword?: string;
      nickname?: string;
    },
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
    }

    // 현재 패스워드가 필요한 경우 확인
    if (!updateData.currentPassword) {
      throw new UnauthorizedException('기존 비밀번호를 입력해주세요.');
    }

    // 현재 패스워드 확인
    if (
      updateData.currentPassword &&
      !(await bcrypt.compare(updateData.currentPassword, user.password))
    ) {
      throw new UnauthorizedException('현재 비밀번호가 일치하지 않습니다.');
    }

    // 새로운 패스워드 업데이트
    if (updateData.newPassword) {
      const hashedPassword = await bcrypt.hash(updateData.newPassword, 10);
      user.password = hashedPassword;
    }

    // 닉네임 업데이트
    if (updateData.nickname) {
      user.nickname = updateData.nickname;
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
