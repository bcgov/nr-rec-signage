export default interface PictogramUpdateDto {
  name: string;
  description?: string;
  id_category: number;
  link: string;
  is_archived: boolean;
}