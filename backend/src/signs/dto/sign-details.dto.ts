import { CategoryDto } from '../../categories/dto/category.dto';
import { FieldDto } from './field.dto';
import { SignCreationDto } from './sign-creation.dto';

export class SignDetailsDto extends SignCreationDto {
  id: number;
  authorDisplayName: string;
  is_approved: boolean;
  is_saved_to_library: boolean;
  dateCreated: string;
  category: CategoryDto;
  fields: FieldDto[];
}
