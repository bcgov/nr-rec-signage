import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategoryService } from '../service/categoryService';
import { useSignService } from '../service/signService';
import RefreshPage from '../components/RefreshPage';
import CategoryDto from '../interfaces/CategoryDto';
import SignCategoryOptionDto from '../interfaces/SignCategoryOptionDto';

const NewSign: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [error, setError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryDto | null>(null);
  const navigate = useNavigate();
  const { getCategories } = useCategoryService();
  const { createSign } = useSignService();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await getCategories();
        setCategories(cats);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = async (category: CategoryDto) => {
    if (category.options && category.options.length > 0) {
      setSelectedCategory(category);
    } else {
      setLoading(true);
      try {
        const sign = await createSign(category.id,null);
        navigate(`/sign-configuration/${sign.id}`);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubCategoryClick = async (option: SignCategoryOptionDto) => {
    setLoading(true);
    try {
      const sign = await createSign(option.id_category,option.id);
      navigate(`/sign-configuration/${sign.id}`);
    } catch (err) {
        console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (selectedCategory) {
      setSelectedCategory(null);
    }
    else {
        navigate('/welcome');
    }
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <RefreshPage />;
  }

  const displayCategories = selectedCategory ? selectedCategory.options : categories;

  return (
    <div className={`${selectedCategory? 'centered-container' : 'centered-l-container'} d-flex flex-column align-items-center justify-content-center mt-5`}>
        <div className="blue-heading-container mb-4">
            <div className='blue-heading'>
                <p>Please select from options below:</p>
            </div>
            {!selectedCategory && <div className="container-content">
                <div className='c-row'>
            {displayCategories.map((category) => (
                <div key={category.id} className="sign-card" onClick={() => handleCategoryClick(category)}>
                {category.preview_img && <img src={category.preview_img} alt={category.name} style={{ maxWidth: '100px' }} />}
                <p>{category.name}</p>
                </div>
            ))}
                </div>
            </div>}
            {selectedCategory && <div className="container-content">
                <div className='c-row'>
            {selectedCategory.options.map((option) => (
                <div key={option.id} className="action-card" onClick={() => handleSubCategoryClick(option)}>
                <p>{option.name}</p>
                </div>
            ))}
                </div>
            </div>}
        </div>
        <div className="d-flex justify-content-between w-100">
            <button className="btn btn-secondary" onClick={handleBack}>
                <i className="bi bi-arrow-left"></i> Back
            </button>
        </div>
    </div>
  );
};

export default NewSign;
