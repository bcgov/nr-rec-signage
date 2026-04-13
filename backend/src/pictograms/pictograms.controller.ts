import { Controller, Get, Query } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PictogramSearchDto } from './dto/pictogram-search.dto';

@Controller('pictograms')
export class PictogramsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getAll(
    @Query('search') search?: string,
    @Query('category') category?: string,
  ): Promise<PictogramSearchDto> {
    // Get all categories
    const categories = await this.prisma.signPictogramCategory.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    // Build where clause for pictograms
    const where: any = {
      is_archived: false,
    };

    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    if (category) {
      where.id_category = parseInt(category);
    }

    // Get filtered pictograms
    const pictograms = await this.prisma.signPictogram.findMany({
      where,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return {
      categories: categories.map(cat => ({
        id: Number(cat.id),
        name: cat.name,
      })),
      results: pictograms.map(pic => ({
        id: Number(pic.id),
        name: pic.name,
        link: pic.link,
        category: {
          id: Number(pic.category.id),
          name: pic.category.name,
        },
      })),
    };
  }
}
