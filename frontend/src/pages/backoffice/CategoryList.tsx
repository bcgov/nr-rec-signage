import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategoryService } from '../../service/categoryService';
import CategoryDto from '../../interfaces/CategoryDto';

export default function CategoryList() {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getCategories } = useCategoryService();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategories();
        setCategories(result);
      } catch (err) {
        console.error('Failed to fetch categories', err);
        setError('Unable to load categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" aria-hidden="true"></div>
        <span className="ms-2">Loading categories...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-danger mt-4">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Sign Category Management</h1>
      </div>
      <div className="d-flex flex-wrap gap-3">
        {categories.map((category) => (
            <div key={category.id} className="sign-card" onClick={() => navigate(`/backoffice/categories/${category.id}`)}>
                {category.preview_img && <img src={'/' + category.preview_img} alt={category.name} style={{ maxWidth: '100px' }} />}
                <p>{category.name}</p>
                </div>
        ))}
      </div>
    </div>
  );
}
