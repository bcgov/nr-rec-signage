import CategoryDto from './CategoryDto';

export default interface SignCategoryOptionDto {
  id: number;
  id_category: number;
  name: string;
  preview_img: string | null;
  category: CategoryDto;
}