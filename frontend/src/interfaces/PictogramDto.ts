import PictogramCategoryDto from './PictogramCategoryDto';

export default interface PictogramDto {
  id: number;
  name: string;
  description?: string;
  link: string;
  category: PictogramCategoryDto;
}