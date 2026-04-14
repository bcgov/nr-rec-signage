import { useAuth } from '../providers/AuthProvider';
import SignDto from '../interfaces/SignDto';

export const useSignService = () => {
  const { apiFetch } = useAuth();

  const createSign = async (categoryId: number, idOpt: number | null): Promise<SignDto> => {
    const response = await apiFetch('/signs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_category: categoryId, id_options: idOpt }),
    });
    if (!response.ok) {
      throw new Error('Failed to create sign');
    }
    return response.json();
  };

  const getSign = async (id: number): Promise<SignDto> => {
    const response = await apiFetch(`/signs/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch sign');
    }
    return response.json();
  };

  const getSigns = async (limit: number = 20): Promise<SignDto[]> => {
    const response = await apiFetch(`/signs?limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch signs');
    }
    return response.json();
  };

  const updateSign = async (
    id: string,
    id_category: number,
    id_options: number | null,
    values: Array<{ id_field: number; value: string }>
  ): Promise<void> => {
    const response = await apiFetch(`/signs/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, id_category, id_options,values }),
    });
    if (!response.ok) {
      throw new Error('Failed to update sign');
    }
  };

  return { createSign, getSign, getSigns, updateSign };
};
