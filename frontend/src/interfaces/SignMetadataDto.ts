export default interface SignMetadataDto {
  id?: number;
  meta_key: string;
  meta_value: string;
  id_category: number;
  id_options?: number;
  human_label: string;
  modifiable: boolean;
  unit?: string;
}
