import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PictogramDto } from './dto/pictogram.dto';

@Injectable()
export class PictogramsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(
    search?: string,
    category?: string,
  ): Promise<{ categories: any[]; results: PictogramDto[] }> {
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
      where.id_category = Number.parseInt(category);
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
       description: pic.description,
        link: pic.link,
        category: {
          id: Number(pic.category.id),
          name: pic.category.name,
        },
      })),
    };
  }

  async create(data: {
    name: string;
    description?: string;
    id_category: bigint | number;
    link: string;
  }): Promise<PictogramDto> {
    const createData: any = {
      name: data.name,
      description: data.description,
      id_category: typeof data.id_category === 'bigint' ? Number(data.id_category) : data.id_category,
      link: data.link,
    };

    const pictogram = await this.prisma.signPictogram.create({
      data: createData,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const result = pictogram as any;
    return {
      id: Number(result.id),
      name: result.name,
      description: result.description,
      link: result.link,
      category: {
        id: Number(result.category.id),
        name: result.category.name,
      },
    };
  }

  async update(id: number, data: {
    name: string;
    description?: string;
    id_category: bigint | number;
    link: string;
    is_archived: boolean;
  }): Promise<PictogramDto> {
    console.log(data.is_archived);
     console.log(Boolean(data.is_archived));
    const updateData: any = {
      name: data.name,
      description: data.description,
      id_category: Number(data.id_category),
      link: data.link,
      is_archived: Boolean(data.is_archived)
    };

    const pictogram = await this.prisma.signPictogram.update({
      where: { id: id },
      data: updateData,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const result = pictogram as any;
    return {
      id: Number(result.id),
      name: result.name,
      description: result.description,
      link: result.link,
      category: {
        id: Number(result.category.id),
        name: result.category.name,
      },
    };
  }
}
