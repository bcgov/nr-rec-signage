import React, { useState, useEffect } from 'react';
import { FieldProps } from '../../interfaces/FieldProps';
import { useDropdownValueService } from '../../service/dropdownValueService';
import DropdownValueDto from '../../interfaces/DropdownValueDto';

const DropdownField: React.FC<FieldProps> = ({ field, updateCallback }) => {
  const [options, setOptions] = useState<Map<string, DropdownValueDto[]>>(new Map());
  const { getDropdownValues } = useDropdownValueService();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const values = await getDropdownValues(field.id);
        console.log('Fetched dropdown values:', values);
        setOptions(new Map(Object.entries(values)));
        console.log('Transformed options:', new Map(Object.entries(values)));
      } catch (err) {
        console.error('Failed to fetch dropdown values', err);
      }
    };
    fetchOptions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateCallback(e.target.value);
  };

  return (
    <div className='form-input d-flex flex-column'>
      <label>{field.name}</label>
      <select value={field.value || ''} onChange={handleChange}>
        <option value="">Select...</option>

        {options.entries().map(([category, optionList]) => {
          return (
            <optgroup key={category} label={category}>
              {optionList.map((option) => (
                <option key={option.id} value={option.value|| ''}>{option.value}</option>
              ))}
            </optgroup>
          );
        })}

      </select>
    </div>
  );
};

export default DropdownField;
