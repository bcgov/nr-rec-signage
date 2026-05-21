import React, { useEffect, useState } from 'react';
import { useUserService } from '../../service/userService';
import UserDto from '../../interfaces/UserDto';
import UserPopup from '../../components/users/UserPopup';

const UserList: React.FC = () => {
  const { getUsers, upsert, deleteUser } = useUserService();
  const [users, setUsers] = useState<UserDto[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserDto | undefined>(undefined);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await getUsers();
      setUsers(result || []);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchUsers();
  }, []);

  const handleNewUser = () => {
    setSelectedUser(undefined);
    setShowPopup(true);
  };

  const handleEdit = (user: UserDto) => {
    setSelectedUser(user);
    setShowPopup(true);
  };

  const handleDelete = async (id?: number) => {
    if (!id) {
      return;
    }
    if (!window.confirm('Delete this user?')) {
      return;
    }
    try {
      await deleteUser(id);
      await fetchUsers();
    } catch (err) {
      console.error(err);
      alert('Unable to delete user.');
    }
  };

  const handleSave = async (user: UserDto) => {
    await upsert(user);
    await fetchUsers();
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>User Management</h1>
        <button className="btn btn-primary" onClick={handleNewUser}>New</button>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-5" aria-live="polite">
          <div className="spinner-border text-primary" aria-hidden="true"></div>
          <span className="visually-hidden">Loading</span>
        </div>
      ) : error ? (
        <div className="alert alert-danger">Unable to load users.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-primary">
              <tr>
                <th>Display Name</th>
                <th>IDIR</th>
                <th>Role</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id ?? user.idir_username}>
                  <td>{user.display_name}</td>
                  <td>{user.idir_username}</td>
                  <td>{user.role}</td>
                  <td>{user.is_active ? 'Yes' : 'No'}</td>
                  <td>
                    <button className="btn btn-link p-0 me-3" onClick={() => handleEdit(user)}>
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-link p-0 text-danger" onClick={() => handleDelete(user.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showPopup && <UserPopup user={selectedUser} onClose={() => setShowPopup(false)} onSave={handleSave} />}
    </div>
  );
};

export default UserList;
