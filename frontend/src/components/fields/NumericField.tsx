import React from 'react';
import { FieldProps } from '../../interfaces/FieldProps';

const NumericField: React.FC<FieldProps> = ({ field, updateCallback }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCallback(Number(e.target.value));
  };

  return (
    <div className='form-input d-flex flex-column'>
      <label>{field.name}</label>
      <input type="number" value={field.value || ''} onChange={handleChange} />
    </div>
  );
};

export default NumericField;
