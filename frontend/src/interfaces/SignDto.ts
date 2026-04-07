import UserDto from './UserDto';
import CategoryDto from './CategoryDto';
import FieldDto from './FieldDto';
import SignCategoryOptionDto from './SignCategoryOptionDto';

export default interface SignDto {
  id: number;
  id_user: number | null;
  id_category: number;
  id_options: number | null;
  date_created: string;
  date_updated: string;
  svg_version: string | null;
  user: UserDto | null;
  category: CategoryDto;
  option: SignCategoryOptionDto | null;
  fields: FieldDto[];
}
