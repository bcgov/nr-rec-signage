import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('pictograms')
export class PictogramsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getAll() {
    return this.prisma.signPictogram.findMany({
      include: {
        category: true,
      },
    });
  }
}
