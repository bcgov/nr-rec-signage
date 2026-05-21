import React, { useEffect, useState } from 'react';
import UserDto from '../../interfaces/UserDto';

interface UserPopupProps {
  user?: UserDto;
  onClose: () => void;
  onSave: (user: UserDto) => Promise<void>;
}

const UserPopup: React.FC<UserPopupProps> = ({ user, onClose, onSave }) => {
  const [idirUsername, setIdirUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState('user');
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setIdirUsername(user.idir_username);
      setDisplayName(user.display_name);
      setRole(user.role);
      setIsActive(user.is_active);
    }
  }, [user]);

  const handleSave = async () => {
    if (!idirUsername || !displayName || !role) {
      alert('Please fill all required fields.');
      return;
    }

    const payload: UserDto = {
      id: user?.id,
      idir_username: idirUsername,
      display_name: displayName,
      role,
      is_active: isActive,
    };

    setLoading(true);
    try {
      await onSave(payload);
      onClose();
    } catch (err) {
      console.error(err);
      alert('Unable to save user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div onClick={onClose} className="modal-background"></div>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white" style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
            <p className="modal-title fw-bold">{user ? 'Edit User' : 'New User'}</p>
            <button type="button" className="btn btn-light" onClick={handleSave} disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm"></span> : 'Save'}
            </button>
          </div>
          <div className="modal-body sign-modal-body d-flex flex-column gap-3">
            <div className="form-input d-flex flex-column mb-3">
              <label htmlFor="idir_username">IDIR Username</label>
              <input id="idir_username" type="text" value={idirUsername} onChange={(e) => setIdirUsername(e.target.value)} />
            </div>
            <div className="form-input d-flex flex-column mb-3">
              <label htmlFor="display_name">Display Name</label>
              <input id="display_name" type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </div>
            <div className="form-input d-flex flex-column mb-3">
              <label htmlFor="role">Role</label>
              <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="form-input d-flex align-items-center gap-2 mb-3">
              <input
                id="is_active"
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
              <label htmlFor="is_active" className="mb-0">Active</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPopup;
