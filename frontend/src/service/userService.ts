import { useAuth } from '../providers/AuthProvider';
import UserDto from '../interfaces/UserDto';

export const useUserService = () => {
  const { apiFetch } = useAuth();

  const authenticate = async (): Promise<UserDto> => {
    const response = await apiFetch('/auth/authenticate');
    if (!response.ok) {
      throw new Error('Failed to authenticate');
    }
    return response.json();
  };

  const getUsers = async (filter?: string): Promise<UserDto[]> => {
    const params = new URLSearchParams();
    if (filter) {
      params.set('filter', filter);
    }

    const response = await apiFetch(`/auth/users?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return response.json();
  };

  const upsert = async (user: UserDto): Promise<UserDto> => {
    const response = await apiFetch('/auth/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Failed to save user');
    }

    return response.json();
  };

  const deleteUser = async (id: number): Promise<void> => {
    const response = await apiFetch(`/auth/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  };

  return { authenticate, getUsers, upsert, deleteUser };
};
