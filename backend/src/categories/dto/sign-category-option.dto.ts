import { SignMetadataDto } from './sign-metadata.dto';

export class SignCategoryOptionDto {
  id: number;
  id_category: number;
  name: string;
  metadata?: SignMetadataDto[];
}
