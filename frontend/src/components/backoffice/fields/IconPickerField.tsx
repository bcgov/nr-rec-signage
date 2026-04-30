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
  const [canUpload, setCanUpload] = useState<boolean>(field.restriction?.can_upload ?? false);
  const [iconLabel, setIconLabel] = useState<string>(field.restriction?.icon_label ?? 'pictogram');
  const [canOpenLibrary, setCanOpenLibrary] = useState(field.restriction?.can_open_library !== undefined ?field.restriction?.can_open_library:true);
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
  }, [apiFetch]);

  useEffect(() => {
    setSelectedCategories(field.restriction?.categories ?? []);
    setCanUpload(field.restriction?.can_upload ?? false);
  }, []);

  useEffect(()=>{
    updateCallback({
      ...field,
      restriction: {
        ...(field.restriction || {}),
        categories: selectedCategories,
        ...(canUpload !== undefined ? { can_upload: canUpload } : {}),
        icon_label: iconLabel,
        can_open_library: canOpenLibrary
      },
    });
  },[canUpload,selectedCategories,iconLabel, canOpenLibrary]);


  const handleCategoryToggle = (id: number) => {
    const nextCategories = selectedCategories.includes(id)
      ? selectedCategories.filter((item) => item !== id)
      : [...selectedCategories, id];

    setSelectedCategories(nextCategories);
  };


  const handleUploadToggle = (enabled: boolean) => {
    setCanUpload(enabled);
  };

  return (
    <div className="form-input d-flex flex-column mb-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{field.name}</span>
      </div>
      <div className="d-flex flex-column gap-3">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={canUpload}
            onChange={(e) => handleUploadToggle(e.target.checked)}
          />
          Allow upload
        </label>
        <div className='d-flex align-items-center gap-3'>
            <label className='small-label'>Alternative Label</label>
            <input style={{width: '500px'}} type="text" value={iconLabel} onChange={(e)=> setIconLabel(e.target.value)} />
        </div>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={canOpenLibrary}
            onChange={(e) => setCanOpenLibrary(e.target.checked)}
          />
          Can Open Pictogram Library
        </label>
        {canOpenLibrary && <div className="d-flex flex-column gap-1">
          <label className="small-label">Categories</label>
          <div className="d-flex gap-3 flex-wrap">
            {availableCategories.map((category) => (
              <label key={category.id} className="d-flex checkbox-label align-items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryToggle(category.id)}
                />
                {category.name}
              </label>
            ))}
          </div>
        </div>}
      </div>
    </div>
  );
};

export default IconPickerField;
