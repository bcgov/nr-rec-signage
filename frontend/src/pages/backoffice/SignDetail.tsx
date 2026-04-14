import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCategoryService } from '../../service/categoryService';
import CategoryDto from '../../interfaces/CategoryDto';
import FieldDto from '../../interfaces/FieldDto';
import TextField from '../../components/backoffice/fields/TextField';
import IconPickerField from '../../components/backoffice/fields/IconPickerField';

export default function SignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCategory, updateCategory } = useCategoryService();
  const [category, setCategory] = useState<CategoryDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchCategory = async () => {
      try {
        const result = await getCategory(id);
        setCategory(result);
      } catch (err) {
        console.error(err);
        setError('Failed to load category');
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  const handleFieldUpdate = (updatedField: FieldDto) => {
    setCategory((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        fields: prev.fields.map((field) => (field.id === updatedField.id ? updatedField : field)),
      };
    });
  };

  const handleOptionMetadataUpdate = (optionId: number, metadataId: number, value: string) => {
    setCategory((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        options: prev.options.map((option) => {
          if (option.id !== optionId || !option.metadata) return option;
          return {
            ...option,
            metadata: option.metadata.map((meta) =>
              meta.id === metadataId ? { ...meta, meta_value: value } : meta,
            ),
          };
        }),
      };
    });
  };

  const handleSave = async () => {
    if (!category || !id) return;
    setSaving(true);
    try {
      await updateCategory(Number(id), category);
      navigate(`/backoffice/categories/${id}`);
    } catch (err) {
      console.error(err);
      setError('Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" aria-hidden="true"></div>
        <span className="ms-2">Loading category...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-danger mt-4">{error}</div>;
  }

  if (!category) {
    return <div className="mt-4">Category not found.</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Configure {category.name}</h1>
        </div>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? <span className="spinner-border spinner-border-sm"></span> : 'Save'}
        </button>
      </div>

      <div className="mb-5">
        <p className='form-subtitle'>Fields</p>
        {category.fields.map((field) => {
          if (field.field_type === 'text') {
            return <TextField key={field.id} field={field} updateCallback={handleFieldUpdate} />;
          }
          if (field.field_type === 'icon_picker') {
            return <IconPickerField key={field.id} field={field} updateCallback={handleFieldUpdate} />;
          }
          return null;
        })}
      </div>

      {category.options.map((option) => (
        <div key={option.id} className="mb-4">
          <p className='form-subtitle'>{option.name} metadata</p>
          <div className="d-flex gap-3">
            {option.metadata?.map((meta) => (
                <div className="form-input d-flex flex-column mb-3" key={meta.id ?? meta.meta_key}>
                <label className='small-label'>{meta.human_label}</label>
                <div className="d-flex gap-2 align-items-center">
                    <input
                    type="text"
                    value={meta.meta_value}
                    onChange={(e) => handleOptionMetadataUpdate(option.id, meta.id ?? 0, e.target.value)}
                    />
                    {meta.unit && <span>{meta.unit}</span>}
                </div>
                </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
