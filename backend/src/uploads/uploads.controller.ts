import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadsController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const result = await this.uploadService.uploadSvg(file);
    return { url: result.url };
  }
}
