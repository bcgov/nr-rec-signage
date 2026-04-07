import { useAuth } from '../providers/AuthProvider';
import DropdownValueDto from '../interfaces/DropdownValueDto';

export const useDropdownValueService = () => {
  const { apiFetch } = useAuth();

  const getDropdownValues = async (fieldId: number): Promise<DropdownValueDto[]> => {
    const response = await apiFetch(`/dropdown_values/${fieldId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch dropdown values');
    }
    return response.json();
  };

  return { getDropdownValues };
};
