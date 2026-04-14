import { Controller, Get, Param, Put, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryMapper } from './mapper/category.mapper';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories() {
    const categories = await this.categoriesService.getCategories();
    return CategoryMapper.toCategoryListDto(categories);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const category = await this.categoriesService.getOne(Number(id));
    if (!category) {
      return null;
    }
    return CategoryMapper.toCategoryDto(category);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: CategoryDto) {
    const categoryModel = CategoryMapper.toCategory(dto);
    if (categoryModel.id !== Number(id)) {
      throw new Error('Category id mismatch');
    }
    const updated = await this.categoriesService.updateOne(categoryModel);
    return CategoryMapper.toCategoryDto(updated);
  }
}
