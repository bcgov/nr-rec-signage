import React, { useRef, useState, useEffect } from 'react';
import PictogramCategoryDto from '../interfaces/PictogramCategoryDto';
import PictogramDto from '../interfaces/PictogramDto';
import PictogramUpdateDto from '../interfaces/PictogramUpdateDto';
import { usePictogramService } from '../service/pictogramService';

interface PictogramProps {
  categories: PictogramCategoryDto[];
  onClose: () => void;
  pictogram?: PictogramDto;
}

const Pictogram: React.FC<PictogramProps> = ({ categories, onClose, pictogram }) => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [idCategory, setIdCategory] = useState('');
  const [isArchived, setIsArchived] = useState(false);
  const [loading, setLoading] = useState(false);
  const { create, update } = usePictogramService();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (pictogram) {
      setName(pictogram.name);
      setDescription(pictogram.description || '');
      setIdCategory(pictogram.category.id.toString());
      setIsArchived(pictogram.isArchived);
    }
  }, [pictogram]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSave = async (isArchivedParam: boolean = false) => {
    if (!name || !idCategory) {
      alert('Please fill all required fields');
      return;
    }
    if (!pictogram && !file) {
      alert('Please select a file');
      return;
    }
    setLoading(true);
    try {
      if (pictogram) {
        const updateData: PictogramUpdateDto = {
          name,
          description: description || undefined,
          id_category: Number(idCategory),
          link: pictogram.link,
          is_archived: isArchivedParam,
        };
        await update(pictogram.id, updateData, file || undefined);
      } else {
        await create(file!, name, description || undefined, idCategory);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save pictogram', error);
      alert('Failed to save pictogram');
    } finally {
      setLoading(false);
    }
  };

  const handleArchive = () => {
    handleSave(!isArchived);
    setIsArchived(!isArchived);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  }
  const isUpdate = !!pictogram;

  return (
    <div  className="modal show d-block" tabIndex={-1}>
        <div onClick={onClose} className='modal-background'></div>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white" style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
            <p className="modal-title fw-bold">{isUpdate ? 'Update Pictogram' : 'New Pictogram'}</p>
            <div>
              {isUpdate && !loading && (
                <button type="button" className="btn btn-secondary me-2" onClick={handleArchive}>
                  {isArchived ? 'Unarchive' : 'Archive'}
                </button>
              )}
              <button type="button" className="btn btn-light" onClick={handleSave} disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm"></span> : 'Save'}
              </button>
            </div>
          </div>
          <div className="modal-body sign-modal-body d-flex">
            <div className="sign-modal-image">
              <div onClick={handleImageClick} className='image-wrapper'>
                {file ? (
                  <img src={URL.createObjectURL(file)} alt="Preview" style={{ width: '100%', height: '100%' }} />
                ) : pictogram ? (
                  <img src={pictogram.link} alt="Current" style={{ width: '100%', height: '100%' }} />
                ) : (
                  <i  className="bi bi-upload icon-upload" style={{ fontSize: '40px' }}></i>
                )}
              </div>
              <input type="file" ref={fileInputRef} style={{display: 'none'}} accept="image/svg+xml" onChange={handleFileChange} className="mt-2" />
            </div>
            <div className="flex-fill ms-3">
              <div className="form-input d-flex flex-column mb-3">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-input d-flex flex-column mb-3">
                <label htmlFor="description">Description</label>
                <input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="form-input d-flex flex-column mb-3">
                <label htmlFor="category">Category</label>
                <select id="category" value={idCategory} onChange={(e) => setIdCategory(e.target.value)}>
                  <option value="">Select...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pictogram;
