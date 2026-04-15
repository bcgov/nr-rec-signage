import { CategoryDto } from './category.dto';

export class PictogramDto {
  id: number;
  name: string;
  description?: string;
  link: string;
  category: CategoryDto;
  isArchived: boolean;
}
