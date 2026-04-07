import { SignCategory, Prisma } from '@prisma/client';
import { CategoryDto } from '../dto/category.dto';
import { SignCategoryOptionDto } from '../dto/sign-category-option.dto';

type SignCategoryWithRelations = Prisma.SignCategoryGetPayload<{
  include: {
    options: true;
    metadata: true;
  };
}>;

export class CategoryMapper {
  static toCategoryListDto(categories: SignCategoryWithRelations[]): CategoryDto[] {
    return categories.map(cat => this.toCategoryDto(cat));
  }

  static toCategoryDto(category: SignCategoryWithRelations): CategoryDto {
    return {
      id: category.id.toNumber(),
      name: category.name,
      slug: category.slug,
      preview_img: category.preview_img,
      options: category.options ? category.options.map(opt => ({
        id: opt.id.toNumber(),
        id_category: opt.id_category.toNumber(),
        name: opt.name,
      })) : [],
      metadata: category.metadata,
    };
  }

}
