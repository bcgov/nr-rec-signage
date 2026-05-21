import React, { useEffect, useState } from 'react';
import FieldDto from '../../../interfaces/FieldDto';
import CheckboxSwitch from './CheckboxSwitch';

interface NumericFieldProps {
  field: FieldDto;
  updateCallback: (field: FieldDto) => void;
}

const NumericField: React.FC<NumericFieldProps> = ({ field, updateCallback }) => {
  const [min, setMin] = useState<number>(field.restriction?.min ?? 0);
  const [max, setMax] = useState<number>(field.restriction?.max ?? 900);
  const [isResizable, setIsResizable] = useState<boolean>(field.restriction?.isResizable ?? false);


  useEffect(() => {
    setMin(field.restriction?.min ?? 0);
    setMax(field.restriction?.max ?? 0);
  }, [field]);

  useEffect(() => {
    updateCallback({
      ...field,
      restriction: {
        ...(field.restriction || {}),
        min,
        max
      },
    });
  }, [min, max, isResizable]);




  return (
    <div className="form-input d-flex flex-column mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span  style={{fontSize: '18px', fontWeight: 'bold'}}>{field.name}</span>
      </div>
      <div className='d-flex mb-3 gap-3'>
        <div className='d-flex align-items-center gap-3'>
            <label className='small-label'>Min</label>
            <input style={{width: '100px'}} type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} />
        </div>
        <div className='d-flex align-items-center gap-3'>
            <label className='small-label'>Max</label>
            <input style={{width: '100px'}} type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} />
        </div>
      </div>
    </div>
  );
};

export default NumericField;
