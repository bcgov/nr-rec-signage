import { SignDetailsDto } from '../dto/sign-details.dto';
import { SignCreationDto } from '../dto/sign-creation.dto';
import { SignUpdateDto } from '../dto/sign-update.dto';
import { SignApprovalDto } from '../dto/sign-approval.dto';
import { CategoryMapper } from '../../categories/mapper/category.mapper';

export class SignMapper {
  static toSign(dto: SignCreationDto, idirUserGuid: string, displayName: string) {
    return {
      idir_user_guid: idirUserGuid,
      author_display_name: displayName,
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

  static signApprovalDtoToSign(dto: SignApprovalDto) {
    return {
      id: dto.id,
      is_approved: dto.is_approved,
    };
  }

  static toSignDetailsDto(sign: any): SignDetailsDto {
    return {
      id: sign.id.toNumber(),
      id_category: sign.id_category.toNumber(),
      id_options: sign.id_options?.toNumber() || null,
      authorDisplayName: sign.author_display_name,
      is_approved: sign.is_approved,
      is_saved_to_library: sign.is_saved_to_library,
      dateCreated: sign.date_created.toISOString(),
      category: CategoryMapper.toCategoryDto(sign.category),
      option: sign.option?CategoryMapper.toSignCategoryOptionDto(sign.option):undefined,
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
