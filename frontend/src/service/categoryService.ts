import { useAuth } from '../providers/AuthProvider';
import CategoryDto from '../interfaces/CategoryDto';

export const useCategoryService = () => {
  const { apiFetch } = useAuth();

  const getCategories = async (): Promise<CategoryDto[]> => {
    const response = await apiFetch('/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  };

  return { getCategories };
};
