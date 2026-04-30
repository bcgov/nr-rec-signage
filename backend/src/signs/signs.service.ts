import { Injectable } from '@nestjs/common';
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
  date_updated: Date;
  values: Array<{
    id_field: number;
    value: string;
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
    categoryIds?: number[]
  ): Promise<{ total: number; signs: SignWithRelations[] }> {
    const whereFilters: any[] = [];

    whereFilters.push({ is_saved_to_library: true });

    if (idUserGuid) {
      whereFilters.push({
        OR: [{ idir_user_guid: idUserGuid }, { is_approved: true }],
      });
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
    await this.prisma.sign.update({
      where: { id: sign.id },
      data: {
        id_category: sign.id_category,
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

  async delete(id: number): Promise<void> {
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
