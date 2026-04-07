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
    return this.prisma.sign.findUnique({
      where: { id },
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
    }) as Promise<SignWithRelations | null>;
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
