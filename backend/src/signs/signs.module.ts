import { Module } from '@nestjs/common';
import { SignsController } from './signs.controller';
import { SignsService } from './signs.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SignsController],
  providers: [SignsService, PrismaService],
})
export class SignsModule {}