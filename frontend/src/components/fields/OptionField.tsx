import React from 'react';
import { FieldProps } from '../../interfaces/FieldProps';

interface OptionFieldRestrictions {
  values?: string[];
}

const OptionField: React.FC<FieldProps> = ({ field, updateCallback }) => {
  const restrictions: OptionFieldRestrictions = field.restriction || {};
  const options = restrictions.values || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCallback(e.target.value);
  };

  return (
    <div className='form-input d-flex flex-column'>
      <label>{field.name}</label>
      <div className="radio-container">
        {options.map((option) => (
          <label key={option} className="form-check-label">
            <input type="radio" key={option} value={option} name={field.slug} checked={field.value === option} onChange={handleChange} />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default OptionField;
