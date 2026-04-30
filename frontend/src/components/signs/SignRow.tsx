import React from 'react';
import SignDto from '../../interfaces/SignDto';
import { renderSignPreview } from '../../utils/SignPreview';

interface SignRowProps {
  sign: SignDto;
  onToggleApproval: (id: number, isApproved: boolean) => void;
  onDelete: (id: number) => void;
}

const SignRow: React.FC<SignRowProps> = ({ sign, onToggleApproval, onDelete }) => {
  const fieldsMap = new Map(sign.fields.map(f => [f.slug, f]));
  const metadataMap = new Map(sign.category.metadata?.map(m => [m.meta_key, m.meta_value]) || []);

  return (
    <tr>
      <td style={{ width: 180, padding: '0.75rem' }}>
        <div style={{ width: 140, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {renderSignPreview(sign, fieldsMap, metadataMap)}
        </div>
      </td>
      <td>{sign.category.name}</td>
      <td>{new Date(sign.dateCreated).toLocaleDateString()}</td>
      <td>{sign.is_approved ? 'Approved' : 'Pending'}</td>
      <td>
        <button
          className="btn btn-small btn-outline-primary me-2"
          onClick={() => onToggleApproval(sign.id, !sign.is_approved)}
        >
          {sign.is_approved ? 'Disapprove' : 'Approve'}
        </button>
        <button className="btn btn-small btn-sm btn-danger" onClick={() => onDelete(sign.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default SignRow;
