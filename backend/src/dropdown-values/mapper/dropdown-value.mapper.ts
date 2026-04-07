import { Prisma } from '@prisma/client';
import { DropdownValueDto } from '../dto/dropdown-value.dto';

type DropdownValueWithCategory = Prisma.DropdownValueGetPayload<{
  include: {
    category: true;
  };
}>;

export class DropdownValueMapper {
  static toDropdownValueDto(obj: DropdownValueWithCategory): DropdownValueDto {
    return {
      id: obj.id.toNumber(),
      id_category: obj.id_category.toNumber(),
      value: obj.value,
      category: obj.category,
    };
  }

  static toDictionaryDropdownValueDto(list: DropdownValueWithCategory[]): { [key: string]: DropdownValueDto[] } {
    const dict: { [key: string]: DropdownValueDto[] } = {};
    for (const item of list) {
      const key = item.category.category_name;
      if (!dict[key]) dict[key] = [];
      dict[key].push(this.toDropdownValueDto(item));
    }
    return dict;
  }
}