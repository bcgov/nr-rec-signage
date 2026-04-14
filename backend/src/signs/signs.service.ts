import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

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

  async getAll(idUserGuid: string, limit: number): Promise<SignWithRelations[]> {
    const signs = await this.prisma.sign.findMany({
      where: { idir_user_guid: idUserGuid },
      orderBy: { date_created: 'desc' },
      take: limit,
      include: {
        category: {
          include: {
            metadata: true,
          },
        },
        option: true,
        values: {
          include: {
            field: true,
          },
        },
      },
    });

    return signs.map(sign => ({
      ...sign,
      category: {
        ...sign.category,
        metadata: sign.category.metadata.filter(m => m.id_options === sign.id_options || !m.id_options),
      },
    })) as SignWithRelations[];
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
}
