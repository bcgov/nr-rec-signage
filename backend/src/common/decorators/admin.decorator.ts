import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';

export const Admin = () =>
  applyDecorators(SetMetadata('admin', true), UseGuards(AdminGuard));
