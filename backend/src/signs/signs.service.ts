import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CustomException } from 'src/common/exceptions/custom.exception';

type SignWithRelations = Prisma.SignGetPayload<{
  include: {
    category: {
      include: {
        metadata: true;
      };
    };
    option: true;
    values: {
      include: {
        field: true;
      };
    };
  };
}>;

type SignCreateInput = {
  idir_user_guid: string;
  author_display_name: string;
  id_category: number;
  id_options?: number;
  date_created: Date;
  date_updated: Date;
};

type SignUpdateInput = {
  id: number;
  id_category: number;
  id_options?: number | null;
  date_updated: Date;
  name: string;
  is_custom_name: boolean;
  values: Array<{
    id_field: number;
    value: string;
  }>;
};

type SignNameInput = {
  date_created: Date;
  is_approved: boolean;
  category: {
    slug: string;
    name: string;
  };
  option: {
    name: string;
  } | null;
  values: Array<{
    value: string | null;
    field: {
      slug: string;
      restriction: Prisma.JsonValue | null;
    };
  }>;
};

type SignApprovalInput = {
  id: number;
  is_approved: boolean;
};

@Injectable()
export class SignsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSign(id: number): Promise<SignWithRelations | null> {
    const sign = await this.prisma.sign.findUnique({
      where: { id },
      include: {
        option: true,
        values: {
          include: {
            field: true,
          },
          orderBy: {
            field: {
              list_order: 'asc',
            },
          },
        },
      },
    });

    if (!sign) return null;

    const category = await this.prisma.signCategory.findUnique({
      where: { id: sign.id_category },
      include: {
        metadata: {
          where: {
            id_options: sign.id_options,
          },
        },
      },
    });

    return {
      ...sign,
      category,
    } as SignWithRelations;
  }

  async getAll(
    idUserGuid: string | undefined,
    limit: number,
    skip: number = 0,
    dateStart?: string,
    dateEnd?: string,
    categoryIds?: number[],
    libraryStatus?: string,
    name?: string
  ): Promise<{ total: number; signs: SignWithRelations[] }> {
    const whereFilters: any[] = [];

    whereFilters.push({ is_saved_to_library: true });

    if (idUserGuid && libraryStatus !== 'approved') {
      whereFilters.push({
        idir_user_guid: idUserGuid,
      });
      whereFilters.push({ is_approved: false });
    }

    if(libraryStatus === 'approved') {
      whereFilters.push({ is_approved: true });
    }
    if (dateStart || dateEnd) {
      const dateFilter: Prisma.DateTimeFilter = {};
      if (dateStart) dateFilter.gte = new Date(dateStart);
      if (dateEnd) dateFilter.lte = new Date(dateEnd);
      whereFilters.push({ date_created: dateFilter });
    }

    if (categoryIds?.length) {
      whereFilters.push({
        id_category: { in: categoryIds.map(id => new Prisma.Decimal(id)) },
      });
    }

    if (name?.trim()) {
      whereFilters.push({
        name: { contains: name.trim(), mode: 'insensitive' },
      });
    }

    const where = whereFilters.length ? { AND: whereFilters } : undefined;

    const [total, signs] = await Promise.all([
      this.prisma.sign.count({ where }),
      this.prisma.sign.findMany({
        where,
        orderBy: { date_created: 'desc' },
        take: limit,
        skip,
        include: {
          category: true,
          option: true,
          values: {
            include: {
              field: true,
            },
          },
        },
      }),
    ]);

    // Fetch filtered metadata based on unique id_options from signs
    const uniqueOptions = [...new Set(signs.map(s => s.id_options).filter(opt => opt !== null))];

    const metadataFetches = await Promise.all(
      uniqueOptions.map(optId =>
        this.prisma.signMetadata.findMany({
          where: {
            OR: [
              { id_options: optId },
              { id_options: null },
            ],
          },
        })
      )
    );

    const metadataByOption = new Map(
      uniqueOptions.map((optId, idx) => [optId, metadataFetches[idx]])
    );

    return {
      total,
      signs: signs.map(sign => ({
        ...sign,
        category: {
          ...sign.category,
          metadata: sign.id_options !== null
            ? (metadataByOption.get(sign.id_options) || [])
            : [],
        },
      })) as SignWithRelations[],
    };
  }

  async insert(sign: SignCreateInput) {
    const created = await this.prisma.sign.create({
      data: sign,
    });
    const fields = await this.prisma.signField.findMany({
      where: { id_category: sign.id_category },
    });
    const values = fields.map(f => ({
      id_sign: created.id,
      id_field: f.id,
      value: null,
    }));
    await this.prisma.signValue.createMany({
      data: values.map(v => ({
        id: undefined,
        ...v,
      })),
    });
    return created;
  }

  async update(sign: SignUpdateInput): Promise<void> {
    if (sign.is_custom_name && !sign.name.trim()) {
      throw new CustomException('A custom sign name cannot be empty.', 400);
    }
    if (sign.is_custom_name && sign.name.length > 100) {
      throw new CustomException('A sign name cannot exceed 100 characters.', 400);
    }

    const currentSign = await this.prisma.sign.findUnique({
        where: { id: sign.id },
        include: {
          category: true,
          option: true,
          values: {
            include: { field: true },
          },
        },
    });

    if (!currentSign) {
        throw new CustomException('Sign could not be found to generate its name.', 404);
    }

    await this.prisma.sign.update({
      where: { id: sign.id },
      data: {
        id_category: sign.id_category,
        is_custom_name: sign.is_custom_name,
        ...(sign.is_custom_name ? { name: sign.name } : {name: this.generateName(currentSign)}),
        date_updated: new Date(),
      },
    });
    for (const v of sign.values) {
      await this.prisma.signValue.upsert({
        where: {
          id_sign_id_field: {
            id_sign: sign.id,
            id_field: v.id_field,
          },
        },
        update: { value: v.value },
        create: {
          id_sign: sign.id,
          id_field: v.id_field,
          value: v.value,
        },
      });
    }
  }

  private generateName(sign: SignNameInput): string {
    const values = new Map(
      sign.values.map(({ value, field }) => {
        const restriction = field.restriction;
        const defaultValue =
          restriction && typeof restriction === 'object' && !Array.isArray(restriction)
            ? restriction.default_value
            : undefined;
        return [field.slug, value?.trim() || (typeof defaultValue === 'string' ? defaultValue : undefined)];
      })
    );

    let categoryCode = '00';
    if (sign.category.slug.includes('regulatory')) {
      categoryCode = '01';
    } else if (sign.category.slug.includes('cautionary')) {
      categoryCode = '02';
    } else if (sign.category.slug.includes('informational')) {
      categoryCode = '03';
    } else if (sign.category.slug.includes('camp-sign-number-post')) {
      categoryCode = '05';
    } else if (sign.category.slug.includes('blade')) {
      categoryCode = '06';
    } else if (sign.category.slug.includes('welcome-to-your-rec-site-entrance-sign')) {
      categoryCode = '07';
    } else if (sign.category.name.includes('facility')) {
      categoryCode = '04';
    }

    const headerSubText = values.get('header_sub_text');
    const bladeText = values.get('blade_1_text');
    const campNumber = values.get('camp_number');
    const name = headerSubText
      ? `${headerSubText}_`
      : bladeText
        ? `${bladeText}_`
        : campNumber
          ? `Camp Number ${campNumber}_`
          : '';
    const size = sign.option
      ? `${sign.option.name.replaceAll(' ', '').toUpperCase()}_`
      : '';
    const date = `${String(sign.date_created.getMonth() + 1).padStart(2, '0')}-${String(sign.date_created.getDate()).padStart(2, '0')}-${String(sign.date_created.getFullYear()).slice(-2)}`;
    const approvalStatus = sign.is_approved ? 'A' : 'C';

    return `${categoryCode}_${approvalStatus}_${size}${name}${date}`.slice(0, 100);
  }

  async generateAllNames(): Promise<void> {
    const signs = await this.prisma.sign.findMany({
      where: {
        is_custom_name: false,
        OR: [{ name: null }, { name: '' }],
      },
      include: {
        category: true,
        option: true,
        values: {
          include: { field: true },
        },
      },
    });

    await Promise.all(
      signs.map(sign =>
        this.prisma.sign.update({
          where: { id: sign.id },
          data: { name: this.generateName(sign) },
        })
      )
    );
  }

  async approve(signs: SignApprovalInput[]): Promise<void> {
    await this.prisma.$transaction(
      signs.map(sign =>
        this.prisma.sign.update({
          where: { id: sign.id },
          data: { is_approved: sign.is_approved } as any,
        })
      )
    );
  }

  async saveToLibrary(id: number): Promise<void> {
    await this.prisma.sign.update({
      where: { id },
      data: { is_saved_to_library: true } as any,
    });
  }

  async reset(id: number, idirUserGuid: string){
    const sign = await this.prisma.sign.findUnique({
      where: {
        id,
        idir_user_guid: idirUserGuid
      },
    });
    if(!sign){
      throw new CustomException("This sign does not exist or does not belong to the current user.",400);
    }
    await this.prisma.signValue.updateMany({
      where: {
        id_sign: id
      },
      data: {
        value: null
      }
    });
    return true;
  }

  async duplicate(id: number, idirUserGuid: string, displayName: string) {
    const original = await this.prisma.sign.findUnique({
      where: { id },
      include: { values: true },
    });

    if (!original) {
      throw new Error('Sign not found');
    }

    if (!(original as any).is_approved && original.idir_user_guid !== idirUserGuid) {
      throw new Error('Unauthorized');
    }

    const newSign = await this.prisma.sign.create({
      data: {
        idir_user_guid: idirUserGuid,
        author_display_name: displayName,
        id_category: original.id_category,
        id_options: original.id_options,
        is_approved: false,
        is_saved_to_library: false,
        date_created: new Date(),
        date_updated: new Date(),
      },
    });

    const values = original.values.map(v => ({
      id_sign: newSign.id,
      id_field: v.id_field,
      value: v.value,
    }));

    await this.prisma.signValue.createMany({
      data: values,
    });

    return newSign;
  }

  async delete(id: number, hasAdminRole: boolean, idUserGuid: string): Promise<void> {

    if(!hasAdminRole){
      const sign = await this.prisma.sign.findUnique({
        where: { id, idir_user_guid: idUserGuid },
      });

      if(!sign){
        throw new ForbiddenException("This sign does not exist or does not belong to the current user.");
      }
    }

    await this.prisma.$transaction([
      this.prisma.signValue.deleteMany({
        where: { id_sign: id },
      }),
      this.prisma.sign.delete({
        where: { id },
      }),
    ]);
  }
}
