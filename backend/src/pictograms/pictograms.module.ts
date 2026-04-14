import { Module } from '@nestjs/common';
import { PictogramCategoriesController } from './pictogram-categories.controller';
import { PictogramsController } from './pictograms.controller';
import { PictogramsService } from './pictograms.service';
import { UploadService } from '../uploads/upload.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PictogramCategoriesController, PictogramsController],
  providers: [PictogramsService, UploadService, PrismaService],
})
export class PictogramsModule {}
