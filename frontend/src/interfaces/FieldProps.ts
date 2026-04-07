import FieldDto from '../interfaces/FieldDto';

export interface FieldProps {
  field: FieldDto;
  updateCallback: (value: any) => void;
}
