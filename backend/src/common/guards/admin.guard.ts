import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isAdminRoute = this.reflector.get<boolean>('admin', context.getHandler());
    if (!isAdminRoute) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    if (!request?.hasAdminRole) {
      throw new ForbiddenException('Admin role required');
    }

    return true;
  }
}
