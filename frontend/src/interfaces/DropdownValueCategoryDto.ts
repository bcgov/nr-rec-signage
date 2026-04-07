import DropdownValueDto from "./DropdownValueDto";
import FieldDto from "./FieldDto";

export default interface DropdownValueCategoryDto {
  id: number;
  id_sign_field: number;
  category_name: string;
  field: FieldDto;
  values: DropdownValueDto[];
}
