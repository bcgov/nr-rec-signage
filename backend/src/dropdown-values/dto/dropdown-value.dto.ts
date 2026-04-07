import { DropdownValueCategory } from '@prisma/client';

export class DropdownValueDto {
  id: number;
  id_category: number;
  value: string;
  category: DropdownValueCategory;
}