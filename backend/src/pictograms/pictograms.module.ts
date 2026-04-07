import { Module } from '@nestjs/common';
import { PictogramCategoriesController } from './pictogram-categories.controller';
import { PictogramsController } from './pictograms.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PictogramCategoriesController, PictogramsController],
  providers: [PrismaService],
})
export class PictogramsModule {}