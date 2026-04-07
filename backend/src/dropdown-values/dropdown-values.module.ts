import { Module } from '@nestjs/common';
import { DropdownValuesController } from './dropdown-values.controller';
import { DropdownValuesService } from './dropdown-values.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [DropdownValuesController],
  providers: [DropdownValuesService, PrismaService],
})
export class DropdownValuesModule {}