import FieldDto from './FieldDto';
import SignMetadataDto from './SignMetadataDto';
import SignCategoryOptionDto from './SignCategoryOptionDto';

export default interface CategoryDto {
  id: number;
  name: string;
  slug: string;
  preview_img: string | null;
  fields: FieldDto[];
  metadata: SignMetadataDto[];
  options: SignCategoryOptionDto[];
}
