import React from 'react';
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
}

const FieldConfiguration: React.FC<FieldConfigurationProps> = ({ update, fields, category }) => {
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

  return (
    <div className="w-100 d-flex flex-column align-items-center justify-content-center">
        <div className="blue-heading-container mb-4">
            <div className='blue-heading'>
                <p>Please fill in the {category.name} information:</p>
            </div>
            <div className="container-content">
                <div className="form-input-container">
                {Array.from(fields.values()).map(renderField)}
                </div>
            </div>
        </div>
    </div>
  );
};

export default FieldConfiguration;
