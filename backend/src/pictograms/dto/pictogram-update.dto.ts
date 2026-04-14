import { PictogramCreateDto } from './pictogram-create.dto';

export class PictogramUpdateDto extends PictogramCreateDto {
  link: string;
  is_archived: string;
}
