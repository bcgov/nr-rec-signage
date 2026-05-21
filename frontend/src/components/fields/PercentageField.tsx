import React from 'react';
import { FieldProps } from '../../interfaces/FieldProps';

const PercentageField: React.FC<FieldProps> = ({ field, updateCallback }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const min = field.restriction?.min ?? 0;
    const max = field.restriction?.max ?? 100;

    let value = Number(e.target.value);

    if (value < min) value = min;
    if (value > max) value = max;

    updateCallback(value.toString());
  };

  return (
    <div className="form-input percentage-field d-flex flex-column">

      <input
        className="percentage-field__range"
        type="range"
        min={field.restriction?.min ?? 0}
        max={field.restriction?.max ?? 100}
        value={field.value ?? 100}
        onChange={handleChange}
        style={{
          background: `
          linear-gradient(
          to right,
          #234075  0%,
          #234075 var(--value, ${field.value ?? 100}%),
          #e5e7eb var(--value, ${field.value ?? 100}%),
          #e5e7eb 100%
        )`
        }}
      />
    </div>
  );
};

export default PercentageField;
