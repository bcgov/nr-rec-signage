import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryMapper } from './mapper/category.mapper';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories() {
    const categories = await this.categoriesService.getCategories();
    return CategoryMapper.toCategoryListDto(categories);
  }
}
