import { SignMetadata } from '@prisma/client';
import { SignCategoryOptionDto } from './sign-category-option.dto';

export class CategoryDto {
  id: number;
  name: string;
  slug: string;
  preview_img?: string;
  options: SignCategoryOptionDto[];
  metadata: SignMetadata[];
}
