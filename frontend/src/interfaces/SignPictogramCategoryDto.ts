import SignPictogramDto from './SignPictogramDto';

export default interface SignPictogramCategoryDto {
  id: number;
  name: string;
  pictograms: SignPictogramDto[];
}
