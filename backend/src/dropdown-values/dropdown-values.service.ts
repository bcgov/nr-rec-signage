import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

type DropdownValueWithCategory = Prisma.DropdownValueGetPayload<{
  include: {
    category: {
      include: {
        field: true;
      };
    };
  };
}>;

@Injectable()
export class DropdownValuesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(idField: number): Promise<DropdownValueWithCategory[]> {
    return this.prisma.dropdownValue.findMany({
      include: {
        category: {
          include: {
            field: true,
          },
        },
      },
      where: {
        category: {
          field: {
            id: idField,
          },
        },
      },
    }) as Promise<DropdownValueWithCategory[]>;
  }
}
