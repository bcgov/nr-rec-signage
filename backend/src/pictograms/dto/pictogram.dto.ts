import { CategoryDto } from './category.dto';

export class PictogramDto {
  id: number;
  name: string;
  link: string;
  category: CategoryDto;
}