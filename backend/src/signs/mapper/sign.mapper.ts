import { Sign, SignValue } from '@prisma/client';
import { SignDetailsDto } from '../dto/sign-details.dto';
import { SignCreationDto } from '../dto/sign-creation.dto';
import { SignUpdateDto } from '../dto/sign-update.dto';
import { CategoryMapper } from '../../categories/mapper/category.mapper';

export class SignMapper {
  static toSign(dto: SignCreationDto) {
    return {
      id_category: dto.id_category,
      id_options: dto.id_options,
      date_created: new Date(),
      date_updated: new Date(),
    };
  }

  static toSignUpdate(dto: SignUpdateDto) {
    return {
      id: dto.id,
      id_category: dto.id_category,
      date_updated: new Date(),
      values: dto.values,
    };
  }

  static toSignDetailsDto(sign: any): SignDetailsDto {
    return {
      id_category: sign.id_category.toNumber(),
      category: CategoryMapper.toCategoryDto(sign.category),
      fields: sign.values.map((v: any) => ({
        id: v.field.id.toNumber(),
        id_category: v.field.id_category.toNumber(),
        field_type: v.field.field_type,
        slug: v.field.slug,
        name: v.field.name,
        restriction: v.field.restriction,
        value: v.value,
      })),
    };
  }
}