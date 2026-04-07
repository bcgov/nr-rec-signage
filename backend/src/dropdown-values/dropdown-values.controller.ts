import { Controller, Get, Param } from '@nestjs/common';
import { DropdownValuesService } from './dropdown-values.service';
import { DropdownValueMapper } from './mapper/dropdown-value.mapper';

@Controller('dropdown_values')
export class DropdownValuesController {
  constructor(private readonly dropdownValuesService: DropdownValuesService) {}

  @Get(':id_field')
  async getAll(@Param('id_field') idField: string) {
    const list = await this.dropdownValuesService.getAll(+idField);
    return DropdownValueMapper.toDictionaryDropdownValueDto(list);
  }
}