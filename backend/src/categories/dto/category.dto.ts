import { FieldDto } from '../../signs/dto/field.dto';
import { SignMetadataDto } from './sign-metadata.dto';
import { SignCategoryOptionDto } from './sign-category-option.dto';

export class CategoryDto {
  id: number;
  name: string;
  slug: string;
  preview_img?: string;
  fields: FieldDto[];
  options: SignCategoryOptionDto[];
  metadata: SignMetadataDto[];
}
