import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CategoryDto } from './dto/category.dto';

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

@Injectable()
export class CategoriesService {
  private readonly CATEGORIES_CACHE_KEY = 'sign_categories';

  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getCategories(): Promise<SignCategoryWithRelations[]> {
    const cached = await this.cacheManager.get<SignCategoryWithRelations[]>(this.CATEGORIES_CACHE_KEY);
    if (cached) {
      return cached;
    }

    const categories = await this.prisma.signCategory.findMany({
      include: {
        options: {
          include: {
            metadatas: true,
          },
        },
        metadata: true,
        fields: true,
      },
    });

    await this.cacheManager.set(this.CATEGORIES_CACHE_KEY, categories, 300000);
    return categories;
  }

  async getOne(id: number): Promise<SignCategoryWithRelations | null> {
    return this.prisma.signCategory.findUnique({
      where: {
        id: id,
      },
      include: {
        options: {
          include: {
            metadatas: true,
          },
        },
        metadata: true,
        fields: true,
      },
    });
  }

  async updateOne(category: CategoryDto): Promise<SignCategoryWithRelations> {
    const categoryId = category.id;

    await this.prisma.$transaction(async (tx) => {
      await tx.signCategory.update({
        where: { id: categoryId },
        data: {
          name: category.name,
          slug: category.slug,
          preview_img: category.preview_img,
        },
      });

      for (const option of category.options) {
        const optionId = option.id;
        await tx.signCategoryOption.update({
          where: { id: optionId },
          data: {
            name: option.name,
          },
        });

        if (option.metadata?.length) {
          for (const metadata of option.metadata) {
            if (metadata.id) {
              await tx.signMetadata.update({
                where: { id: metadata.id },
                data: {
                  meta_key: metadata.meta_key,
                  meta_value: metadata.meta_value,
                  human_label: metadata.human_label,
                  modifiable: metadata.modifiable,
                  unit: metadata.unit,
                } as any,
              });
            }
          }
        }
      }

      if (category.fields.length) {
        for (const field of category.fields) {
          if (field.id) {
            await tx.signField.update({
              where: { id: field.id },
              data: {
                restriction: field.restriction,
              },
            });
          }
        }
      }
    });

    await this.invalidateCache();
    const updatedCategory = await this.getOne(category.id);
    if (!updatedCategory) {
      throw new Error('Category not found after update');
    }
    return updatedCategory;
  }

  async invalidateCache(): Promise<void> {
    await this.cacheManager.del(this.CATEGORIES_CACHE_KEY);
  }
}
