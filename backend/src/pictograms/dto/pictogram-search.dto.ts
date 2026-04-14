import { CategoryDto } from './category.dto';
import { PictogramDto } from './pictogram.dto';

export class PictogramSearchDto {
  categories: CategoryDto[];
  results: PictogramDto[];
}