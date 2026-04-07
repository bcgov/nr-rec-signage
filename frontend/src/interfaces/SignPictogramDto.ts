import SignPictogramCategoryDto from './SignPictogramCategoryDto';

export default interface SignPictogramDto {
  id: number;
  name: string;
  id_category: number;
  link: string;
  is_archived: boolean;
  category: SignPictogramCategoryDto;
}
