import { Controller, Get, Post, Put, Query, Body, UseInterceptors, UploadedFile, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { PictogramsService } from './pictograms.service';
import { UploadService } from '../uploads/upload.service';
import { PictogramSearchDto } from './dto/pictogram-search.dto';
import { PictogramCreateDto } from './dto/pictogram-create.dto';
import { PictogramUpdateDto } from './dto/pictogram-update.dto';
import { PictogramDto } from './dto/pictogram.dto';

@Controller('pictograms')
export class PictogramsController {
  constructor(
    private readonly pictogramsService: PictogramsService,
    private readonly uploadService: UploadService,
  ) {}

  @Get()
  async getAll(
    @Query('search') search?: string,
    @Query('category') category?: string,
  ): Promise<PictogramSearchDto> {
    return this.pictogramsService.getAll(search, category);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Multer.File,
    @Body() dto: PictogramCreateDto,
  ): Promise<PictogramDto> {
    // Upload SVG to S3
    const uploadResult = await this.uploadService.uploadSvg(file);

    // Create pictogram record in database
    const pictogram = await this.pictogramsService.create({
      name: dto.name,
      description: dto.description,
      id_category: BigInt(dto.id_category),
      link: uploadResult.url,
    });

    return pictogram;
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Multer.File | undefined,
    @Body() dto: PictogramUpdateDto,
  ): Promise<PictogramDto> {
    let link = dto.link;
    if (file) {
      // Upload new SVG to S3
      const uploadResult = await this.uploadService.uploadSvg(file);
      link = uploadResult.url;
    }

    // Update pictogram record in database
    const pictogram = await this.pictogramsService.update(Number(id), {
      name: dto.name,
      description: dto.description,
      id_category: dto.id_category,
      link,
      is_archived: dto.is_archived === 'true'
    });

    return pictogram;
  }
}
