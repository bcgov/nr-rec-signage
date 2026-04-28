import UserDto from './UserDto';
import CategoryDto from './CategoryDto';
import FieldDto from './FieldDto';
import SignCategoryOptionDto from './SignCategoryOptionDto';

export default interface SignDto {
  id: number;
  id_category: number;
  id_options: number | null;
  authorDisplayName: string;
  is_approved: boolean;
  dateCreated: string;
  category: CategoryDto;
  option: SignCategoryOptionDto | null;
  fields: FieldDto[];
}
