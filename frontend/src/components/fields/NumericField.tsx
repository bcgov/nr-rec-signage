import React from 'react';
import { FieldProps } from '../../interfaces/FieldProps';

const NumericField: React.FC<FieldProps> = ({ field, updateCallback }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const min = field.restriction?.min ?? 0;
    const max = field.restriction?.max ?? 9999;
    if(e.target.value < min){
      e.target.value = min;
    }
    if(e.target.value > max){
      e.target.value = max;
    }
    updateCallback(e.target.value.toString());
  };

  return (
    <div className='form-input d-flex flex-column'>
      <label>{field.name}</label>
      <input type="number" value={field.value || ''} onChange={handleChange} />
    </div>
  );
};
export default NumericField;
