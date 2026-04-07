import CategoryDto from "./CategoryDto";
import DropdownValueCategoryDto from "./DropdownValueCategoryDto";
export default interface FieldDto {
  id: number;
  id_category: number;
  field_type: string;
  slug: string;
  name: string;
  restriction: any; // JSON
  value?: any; // Current value for form
  category: CategoryDto | null;
  dropdownCategories: DropdownValueCategoryDto[];
}
