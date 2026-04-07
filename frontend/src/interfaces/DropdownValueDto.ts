import DropdownValueCategoryDto from "./DropdownValueCategoryDto";

export default interface DropdownValueDto {
  id: number;
  id_category: number;
  value: string | null;
  category: DropdownValueCategoryDto;
}
