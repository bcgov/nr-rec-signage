import React from 'react';
import FieldDto from '../../interfaces/FieldDto';

interface CautionarySignProps {
  fields: Map<string, FieldDto>;
}

const CautionarySign: React.FC<CautionarySignProps> = ({ fields }) => {
  // Render the sign based on fields
  return (
    <div className="cautionary-sign">
      <h2>Cautionary Sign</h2>
      {/* Render fields */}
      {Array.from(fields.values()).map((field) => (
        <div key={field.id}>
          <strong>{field.name}:</strong> {field.value || 'Not set'}
        </div>
      ))}
    </div>
  );
};

export default CautionarySign;
