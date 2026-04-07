import React, { useState, useEffect } from 'react';
import { FieldProps } from '../../interfaces/FieldProps';
import { useDropdownValueService } from '../../service/dropdownValueService';
import DropdownValueDto from '../../interfaces/DropdownValueDto';

const DropdownField: React.FC<FieldProps> = ({ field, updateCallback }) => {
  const [options, setOptions] = useState<DropdownValueDto[]>([]);
  const { getDropdownValues } = useDropdownValueService();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const values = await getDropdownValues(field.id);
        setOptions(values);
      } catch (err) {
        console.error('Failed to fetch dropdown values');
      }
    };
    fetchOptions();
  }, [field.id, getDropdownValues]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateCallback(e.target.value);
  };

  return (
    <div>
      <label>{field.name}</label>
      <select value={field.value || ''} onChange={handleChange}>
        <option value="">Select...</option>
        {options.map((option) => (
          <optgroup key={option.category.category_name} label={option.category.category_name}>
            <option value={option.value}>{option.value}</option>
          </optgroup>
        ))}
      </select>
    </div>
  );
};

export default DropdownField;
