import { useAuth } from '../providers/AuthProvider';
import PictogramSearchDto from '../interfaces/PictogramSearchDto';

export const usePictogramService = () => {
  const { apiFetch } = useAuth();

  const getPictograms = async (limit: number = 20, search?: string, category?: string): Promise<PictogramSearchDto> => {
    const params = new URLSearchParams();
    params.append('limit', limit.toString());
    if (search) params.append('search', search);
    if (category) params.append('category', category);

    const response = await apiFetch(`/pictograms?${params}`);
    if (!response.ok) {
      throw new Error('Failed to fetch pictograms');
    }
    return response.json();
  };

  return { getPictograms };
};
