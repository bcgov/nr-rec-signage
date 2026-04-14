import React from 'react';
import { FieldProps } from '../../interfaces/FieldProps';

interface TextFieldRestrictions {
  limit?: number;
  default?: string;
}
const TextField: React.FC<FieldProps> = ({ field, updateCallback }) => {

  const restrictions: TextFieldRestrictions = field.restriction || {limit: 0, default: ''};
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(restrictions.limit && e.target.value.length > restrictions.limit){
        updateCallback(e.target.value.slice(0, restrictions.limit));
        return;
    }
    updateCallback(e.target.value);
  };

  return (
    <div className='form-input d-flex flex-column'>
      <div className='d-flex justify-content-between align-items-center mb-2'>
            <label>{field.name}</label>
            {restrictions.limit ? <small className='text-muted'>{restrictions.limit} character limit ({`${field.value ? field.value.length : 0}/${restrictions.limit}`})</small> : null}
      </div>
      <input type="text" value={field.value || ''} onChange={handleChange} />
    </div>
  );
};

export default TextField;
