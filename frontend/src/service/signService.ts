import { useAuth } from '../providers/AuthProvider';
import SignDto from '../interfaces/SignDto';
import SignApprovalDto from '../interfaces/SignApprovalDto';
import SignListDto from '../interfaces/SignListDto';

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

   const duplicate= async (id: number): Promise<SignDto> => {
    const response = await apiFetch('/signs/duplicate/'+id, {
      method: 'POST'
    });
    if (!response.ok) {
      throw new Error('Failed to duplicate sign');
    }
    return response.json();
  }
  const reset= async (id: number): Promise<boolean> => {
    const response = await apiFetch('/signs/reset/'+id, {
      method: 'POST'
    });
    if (!response.ok) {
      throw new Error('Failed to reset sign');
    }
    return true;
  }
  const getSign = async (id: number): Promise<SignDto> => {
    const response = await apiFetch(`/signs/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch sign');
    }
    return response.json();
  };

  const getSigns = async (limit: number = 20): Promise<SignListDto> => {
    const response = await apiFetch(`/signs?limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch signs');
    }
    return response.json();
  };

  const getAllAdmin = async (
    limit: number = 20,
    page: number = 1,
    dateStart?: string,
    dateEnd?: string,
    categoryIds?: number[]
  ): Promise<SignListDto> => {
    const params = new URLSearchParams();
    params.set('view', 'admin_view');
    params.set('limit', String(limit));
    params.set('page', String(page));

    if (dateStart) params.set('dateStart', dateStart);
    if (dateEnd) params.set('dateEnd', dateEnd);
    if (categoryIds?.length) params.set('categoryId', categoryIds.join(','));

    const response = await apiFetch(`/signs?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch admin signs');
    }
    return response.json();
  };

  const approve = async (approvals: SignApprovalDto[]): Promise<void> => {
    const response = await apiFetch('/signs/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(approvals),
    });
    if (!response.ok) {
      throw new Error('Failed to approve signs');
    }
  };

  const deleteSign = async (id: number): Promise<void> => {
    const response = await apiFetch(`/signs/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete sign');
    }
  };

  const saveToLibrary = async (id: number): Promise<void> => {
    const response = await apiFetch(`/signs/${id}/save-library`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to save sign to library');
    }
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
      body: JSON.stringify({ id, id_category, id_options, values }),
    });
    if (!response.ok) {
      throw new Error('Failed to update sign');
    }
  };

  return { reset,duplicate,createSign, getSign, getSigns, getAllAdmin, approve, deleteSign, saveToLibrary, updateSign };
};
