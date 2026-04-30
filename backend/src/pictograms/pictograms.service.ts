import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PictogramDto } from './dto/pictogram.dto';

@Injectable()
export class PictogramsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(
    search?: string,
    category?: string[],
    showArchived: boolean = false
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
      is_archived: showArchived,
    };

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }
    const filteredCategories = category?.filter(c => !isNaN(Number.parseInt(c))).map(Number.parseInt);
    console.log(filteredCategories);
    if (filteredCategories && filteredCategories.length > 0) {
      where.id_category = {
        in: filteredCategories,
      };
    }

    // Get filtered pictograms
    const pictograms = await this.prisma.signPictogram.findMany({
      where,
      orderBy:{
        name: 'asc'
      },
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
       isArchived: pic.is_archived,
        link: pic.link,
        category: {
          id: Number(pic.category.id),
          name: pic.category.name,
          code: pic.category.name
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
        code: result.category.code
      },
      isArchived: result.is_archived,
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
        code: result.category.code
      },
      isArchived: result.is_archived,
    };
  }

  async getCategory(code: string){
    return await this.prisma.signPictogramCategory.findFirst({
      where: {
        code: code
      }
    })
  }

  parseFilename(filename: string): {
    categoryCode: string;
    descriptionCode: string;
    name: string;
  } | null {
    const base = filename.replace(/\.[^/.]+$/, ''); // remove extension
    const parts = base.split('_');

    if (parts.length < 4) return null;

    const [categoryCode, descriptionCode, , ...nameParts] = parts;

    return {
      categoryCode,
      descriptionCode,
      name: parts.join("_"),
    };
  }
  private descriptionMap: Record<string, string> = {
    '01': 'Accessibility',
    '02': 'Boating',
    '03': 'Camping',
    '04': 'Cycling',
    '05': 'Equestrian',
    '06': 'Facilities',
    '07': 'Fishing',
    '08': 'Hiking',
    '09': 'Hunting',
    '10': 'Interpretive',
    '11': 'Natural Features',
    '12': 'Off Road Vehicle (ORV)',
    '13': 'Other',
    '14': 'Safety',
    '15': 'Sports',
    '16': 'Transportation',
    '17': 'Water Activities',
    '18': 'Wildlife',
    '19': 'Winter Activities (Non-Motorized)',
  };

  mapDescription(code: string): string {
    return this.descriptionMap[code] || 'Unknown';
  }
}
