import { useAuth } from '../providers/AuthProvider';
import PictogramSearchDto from '../interfaces/PictogramSearchDto';
import PictogramDto from '../interfaces/PictogramDto';
import PictogramUpdateDto from '../interfaces/PictogramUpdateDto';

export const usePictogramService = () => {
  const { apiFetch } = useAuth();

  const getPictograms = async (limit: number = 20, search?: string, category: string[] = []): Promise<PictogramSearchDto> => {
    const params = new URLSearchParams();
    params.append('limit', limit.toString());
    if (search) params.append('search', search);
    if (category) {
        params.append('category', category.join(';')); // Join multiple categories with a delimiter (e.g., ';')
    }

    const response = await apiFetch(`/pictograms?${params}`);
    if (!response.ok) {
      throw new Error('Failed to fetch pictograms');
    }
    return response.json();
  };

  const create = async (file: File, name: string, description?: string, idCategory?: string): Promise<PictogramDto> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    if (description) formData.append('description', description);
    if(idCategory){
        formData.append('id_category', idCategory);
    }

    const response = await apiFetch('/pictograms', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Failed to create pictogram');
    }
    return response.json();
  };

  const update = async (id: number, data: PictogramUpdateDto, file?: File): Promise<PictogramDto> => {
    const formData = new FormData();
    if (file) formData.append('file', file);
    formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);
    formData.append('id_category', data.id_category.toString());
    formData.append('link', data.link);
    formData.append('is_archived', data.is_archived.toString()); // Convert boolean to 1/0 for form data

    const response = await apiFetch(`/pictograms/${id}`, {
      method: 'PUT',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Failed to update pictogram');
    }
    return response.json();
  };

  return { getPictograms, create, update };
};
