import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignService } from '../../service/signService';
import FieldDto from '../../interfaces/FieldDto';
import CategoryDto from '../../interfaces/CategoryDto';
import TextField from '../fields/TextField';
import NumericField from '../fields/NumericField';
import DropdownField from '../fields/DropdownField';
import IconField from '../fields/IconField';

interface FieldConfigurationProps {
  update: (fieldName: string, value: any) => void;
  fields: Map<string, FieldDto>;
  category: CategoryDto;
  signId: string | undefined;
  idOptions: number | null;
}

const FieldConfiguration: React.FC<FieldConfigurationProps> = ({ update, fields, category, signId, idOptions }) => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const { updateSign,reset } = useSignService();
  const [showStartOver, setShowStartOver] = useState(false);
  const [resetting, setResetting] = useState(false);
  const renderField = (field: FieldDto) => {
    const updateCallback = (value: any) => update(field.slug, value);

    switch (field.field_type) {
      case 'text':
        return <TextField key={field.id} field={field} updateCallback={updateCallback} />;
      case 'number':
        return <NumericField key={field.id} field={field} updateCallback={updateCallback} />;
      case 'dropdown':
        return <DropdownField key={field.id} field={field} updateCallback={updateCallback} />;
      case 'icon_picker':
        return <IconField key={field.id} field={field} updateCallback={updateCallback} />;
      default:
        return <div key={field.id}>Unknown field type</div>;
    }
  };

  const handleStartOver = async () =>{
    setShowStartOver(true);
  }
  const  handleStartOverConfirmation = async () =>{
    setResetting(true);
    await reset(parseFloat(signId || "0"));
    window.location.reload();
  }
  const handleNext = async () => {
    setSaving(true);
    try {
      const values = Array.from(fields.values()).map((field) => ({
        id_field: field.id,
        value: field.value || '',
      }));
      if(!signId) {
        throw new Error('Sign ID is missing');
      }
      await updateSign(signId, category.id, idOptions, values);
      navigate(`/export/${signId}`);
    } catch (error) {
      console.error('Failed to update sign', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-100 d-flex flex-column align-items-center justify-content-center">
      { showStartOver && <div className="start-over-container d-flex">
        <p>are you sure you want to abandon this sign?</p>
        <div className='d-flex'>
          <button className="btn btn-primary" type="button" onClick={handleStartOverConfirmation}>
              {resetting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Saving...
                </>
              ) : (
                'Yes'
              )}
          </button>
          <button className="btn btn-secondary" type="button" onClick={() => setShowStartOver(false)}>
              No
          </button>
        </div>
      </div>}
      <div className="blue-heading-container mb-4">
        <div className='blue-heading'>
          <p>Please fill in the {category.name} information:</p>
        </div>
        <div className="container-content">
          <div className="form-input-container">
            {Array.from(fields.values()).map(renderField)}
          </div>
          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-secondary" type="button" onClick={() => navigate(`/action-choice`)}>
              Back
            </button>
            <button className="btn btn-secondary" type="button" onClick={handleStartOver} disabled={saving}>
                Start Over
            </button>
            <button className="btn btn-primary" type="button" onClick={handleNext} disabled={saving}>
              {saving ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Saving...
                </>
              ) : (
                'Preview'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldConfiguration;
