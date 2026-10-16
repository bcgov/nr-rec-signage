import { SignCreationDto } from './sign-creation.dto';

export class SignValueDto {
  id_field: number;
  value: string;
}

export class SignUpdateDto extends SignCreationDto {
  id: number;
  name?: string;
  is_custom_name?: boolean;
  values: SignValueDto[];
}