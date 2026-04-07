import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

type SignCategoryWithRelations = Prisma.SignCategoryGetPayload<{
  include: {
    options: true;
    metadata: true;
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
    // Try to get from cache first
    const cached = await this.cacheManager.get<SignCategoryWithRelations[]>(this.CATEGORIES_CACHE_KEY);
    if (cached) {
      return cached;
    }

    // Fetch from database
    const categories = await this.prisma.signCategory.findMany({
      include: {
        options: true,
        metadata: true,
      },
    });

    // Store in cache for 5 minutes (300 seconds)
    await this.cacheManager.set(this.CATEGORIES_CACHE_KEY, categories, 300000);

    return categories;
  }

  async invalidateCache(): Promise<void> {
    await this.cacheManager.del(this.CATEGORIES_CACHE_KEY);
  }
}
