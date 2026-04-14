import React, { useEffect, useState } from 'react';
import FieldDto from '../../../interfaces/FieldDto';

interface TextFieldProps {
  field: FieldDto;
  updateCallback: (field: FieldDto) => void;
}

const TextField: React.FC<TextFieldProps> = ({ field, updateCallback }) => {
  const [limit, setLimit] = useState<number>(field.restriction?.limit ?? 0);
  const [defaultValue, setDefaultValue] = useState<string>(field.restriction?.default ?? '');

  useEffect(() => {
    setLimit(field.restriction?.limit ?? 0);
    setDefaultValue(field.restriction?.default ?? '');
  }, [field]);

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = Number(e.target.value);
    setLimit(newLimit);
    updateCallback({
      ...field,
      restriction: {
        ...(field.restriction || {}),
        limit: Number.isNaN(newLimit) ? 0 : newLimit,
        default: defaultValue,
      },
    });
  };

  const handleDefaultChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDefault = e.target.value;
    setDefaultValue(newDefault);
    updateCallback({
      ...field,
      restriction: {
        ...(field.restriction || {}),
        limit,
        default: newDefault,
      },
    });
  };

  return (
    <div className="form-input d-flex flex-column mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span  style={{fontSize: '18px', fontWeight: 'bold'}}>{field.name}</span>
      </div>
      <div className='d-flex mb-3 gap-3'>
        <div className='d-flex align-items-center gap-3'>
            <label className='small-label'>Limit</label>
            <input style={{width: '100px'}} type="number" value={limit} onChange={handleLimitChange} />
        </div>
        <div className='d-flex align-items-center gap-3'>
            <label className='small-label'>Default</label>
            <input style={{width: '500px'}} type="text" value={defaultValue} onChange={handleDefaultChange} />
        </div>
      </div>
    </div>
  );
};

export default TextField;
