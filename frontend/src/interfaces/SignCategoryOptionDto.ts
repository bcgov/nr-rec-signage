import CategoryDto from './CategoryDto';
import SignMetadataDto from './SignMetadataDto';

export default interface SignCategoryOptionDto {
  id: number;
  id_category: number;
  name: string;
  preview_img: string | null;
  metadata?: SignMetadataDto[];
  category?: CategoryDto;
}
