import { Injectable, BadRequestException } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { Multer } from 'multer';
import { CustomException } from 'src/common/exceptions/custom.exception';

interface UploadResult {
  fileKey: string;
  url: string;
}

@Injectable()
export class UploadService {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION || 'us-east-1',
    });
  }

  async uploadSvg(file: Multer.File): Promise<UploadResult> {
    // Validate file type
    if (file.mimetype !== 'image/svg+xml' && !file.originalname.endsWith('.svg')) {
      throw new CustomException('Only SVG files are allowed', 400);
    }

    // Generate unique filename
    const fileExtension = '.svg';
    const uniqueFileName = `${uuidv4()}${fileExtension}`;
    const bucket = process.env.S3_BUCKET;
    const region = process.env.AWS_REGION || 'ca-central-1';

    if (!bucket) {
      throw new Error('S3_BUCKET environment variable is not set');
    }

    // Upload to S3
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: uniqueFileName,
      Body: file.buffer,
      ContentType: 'image/svg+xml'
    });

    await this.s3Client.send(command);

    // Generate URL
    const url = `https://${bucket}.s3.${region}.amazonaws.com/${uniqueFileName}`;

    return {
      fileKey: uniqueFileName,
      url,
    };
  }
}
