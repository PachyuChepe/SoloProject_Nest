// src/auto/guard/admin.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user && user.isAdmin) {
      return true;
    } else {
      throw new UnauthorizedException('관리자 권한이 필요합니다.');
    }
  }
}
