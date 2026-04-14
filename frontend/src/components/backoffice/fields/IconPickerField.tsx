import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../providers/AuthProvider';
import FieldDto from '../../../interfaces/FieldDto';
import PictogramCategoryDto from '../../../interfaces/PictogramCategoryDto';

interface IconPickerFieldProps {
  field: FieldDto;
  updateCallback: (field: FieldDto) => void;
}

const IconPickerField: React.FC<IconPickerFieldProps> = ({ field, updateCallback }) => {
  const { apiFetch } = useAuth();
  const [availableCategories, setAvailableCategories] = useState<PictogramCategoryDto[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>(field.restriction?.categories ?? []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiFetch('/pictogram-categories');
        if (!response.ok) {
          throw new Error('Failed to fetch pictogram categories');
        }
        setAvailableCategories(await response.json());
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setSelectedCategories(field.restriction?.categories ?? []);
  }, [field]);

  const updateRestriction = (newCategories: number[]) => {
    updateCallback({
      ...field,
      restriction: {
        categories: newCategories,
      },
    });
  };



  const handleCategoryToggle = (id: number) => {
    const nextCategories = selectedCategories.includes(id)
      ? selectedCategories.filter((item) => item !== id)
      : [...selectedCategories, id];

    setSelectedCategories(nextCategories);
    updateRestriction(nextCategories);
  };

  return (
    <div className="form-input d-flex flex-column mb-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span  style={{fontSize: '20px', fontWeight: 'bold'}}>{field.name}</span>
      </div>
      <div className='d-flex mb-3 gap-3'>
        <div className='d-flex flex-column gap-1'>
            <label className='small-label'>Categories</label>
            <div className="d-flex gap-3">
          {availableCategories.map((category) => (
            <label key={category.id} className=" d-flex checkbox-label align-items-center gap-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryToggle(category.id)}
              />
              {category.name}
            </label>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default IconPickerField;
