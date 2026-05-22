import React, { useEffect } from 'react';
import { FieldProps } from '../../interfaces/FieldProps';

const ToggleField: React.FC<FieldProps> = ({ field, updateCallback }) => {

   let defaultValue = field.restriction?.default_value;
   let value = field.value || defaultValue || 'false';
   const checked = value === 'true';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCallback(e.target.checked ? 'true' : 'false');
  };

  return (
    <div className="form-input d-flex align-items-center gap-3">
      <label>{field.name}</label>

      <label className="toggle">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        <span className="toggle-slider" />
      </label>
    </div>
  );
};

export default ToggleField;
