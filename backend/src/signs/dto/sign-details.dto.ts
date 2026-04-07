import { CategoryDto } from '../../categories/dto/category.dto';
import { FieldDto } from './field.dto';
import { SignCreationDto } from './sign-creation.dto';

export class SignDetailsDto extends SignCreationDto {
  category: CategoryDto;
  fields: FieldDto[];
}