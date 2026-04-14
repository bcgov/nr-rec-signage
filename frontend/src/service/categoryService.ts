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

  const getCategory = async (id: string): Promise<CategoryDto> => {
    const response = await apiFetch(`/categories/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch category');
    }
    return response.json();
  };

  const updateCategory = async (id: number, category: CategoryDto): Promise<CategoryDto> => {
    const response = await apiFetch(`/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });
    if (!response.ok) {
      throw new Error('Failed to update category');
    }
    return response.json();
  };

  const getAllowedRestrictions = (field_type: string): Map<string, object> => {
    const restrictions = new Map<string, object>([
      ['text', { limit: 100, default: '' }],
      ['dropdown', { limit: 20, default: '' }],
    ]);
    return restrictions;
  };

  return { getCategories, getCategory, updateCategory, getAllowedRestrictions };
};
