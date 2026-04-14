import PictogramCategoryDto from './PictogramCategoryDto';
import PictogramDto from './PictogramDto';

export default interface PictogramSearchDto {
  categories: PictogramCategoryDto[];
  results: PictogramDto[];
}