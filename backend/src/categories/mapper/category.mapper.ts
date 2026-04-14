import { Prisma } from '@prisma/client';
import { CategoryDto } from '../dto/category.dto';

type SignCategoryWithRelations = Prisma.SignCategoryGetPayload<{
  include: {
    options: {
      include: {
        metadatas: true;
      };
    };
    metadata: true;
    fields: true;
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
      fields: category.fields ? category.fields.map((field) => ({
        id: field.id.toNumber(),
        id_category: field.id_category.toNumber(),
        field_type: field.field_type,
        slug: field.slug,
        name: field.name,
        restriction: field.restriction,
        value: '',
      })) : [],
      options: category.options ? category.options.map((opt) => {
        const metadata = opt.metadatas || [];
        return {
          id: opt.id.toNumber(),
          id_category: opt.id_category.toNumber(),
          name: opt.name,
          metadata: metadata.map((meta) => {
            const metaAny = meta as any;
            return {
              id: meta.id.toNumber(),
              meta_key: meta.meta_key,
              meta_value: meta.meta_value,
              id_category: meta.id_category.toNumber(),
              id_options: meta.id_options ? Number(meta.id_options) : undefined,
              human_label: meta.human_label,
              modifiable: meta.modifiable,
              unit: metaAny.unit ?? undefined,
            };
          }),
        };
      }) : [],
      metadata: category.metadata ? category.metadata.map((meta) => {
        const metaAny = meta as any;
        return {
          id: meta.id.toNumber(),
          meta_key: meta.meta_key,
          meta_value: meta.meta_value,
          id_category: meta.id_category.toNumber(),
          id_options: meta.id_options ? Number(meta.id_options) : undefined,
          human_label: meta.human_label,
          modifiable: meta.modifiable,
          unit: metaAny.unit ?? undefined,
        };
      }) : [],
    };
  }

  static toCategory(category: CategoryDto): CategoryDto {
    return {
      ...category,
      fields: category.fields || [],
      options: category.options || [],
      metadata: category.metadata || [],
    };
  }
}

