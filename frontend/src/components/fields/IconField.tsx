import React, { useState, useEffect } from 'react';
import { FieldProps } from '../../interfaces/FieldProps';
import { usePictogramService } from '../../service/pictogramService';
import PictogramSearchDto from '../../interfaces/PictogramSearchDto';
import PictogramDto from '../../interfaces/PictogramDto';

const IconField: React.FC<FieldProps> = ({ field, updateCallback }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [pictogramData, setPictogramData] = useState<PictogramSearchDto | null>(null);
  const [loading, setLoading] = useState(false);
  const { getPictograms } = usePictogramService();

  useEffect(() => {
    if (showPopup) {
      fetchPictograms();
    }
  }, [showPopup, search, category]);

  const fetchPictograms = async () => {
    setLoading(true);
    try {
      const data = await getPictograms(20, search, category);
      setPictogramData(data);
    } catch (err) {
      console.error('Failed to fetch pictograms');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (pictogram: PictogramDto) => {
    let initialValue = field.value ? field.value.split(";") : [];
    updateCallback([...initialValue,pictogram.link].join(";"));
    setShowPopup(false);
  };

  const handleRemove = (index: number) => {
    const newSelected = field.value.split(";").filter((_: any, i: number) => i !== index);
    updateCallback(newSelected.join(";"));
  };

  const values = field.value ? field.value.split(";") : [];

  return (
    <div className="icon-field">
       <div className='form-input d-flex flex-column'>
        <label>{field.name}</label>
        <div className="icon-picker-input">
            <input type="text" readOnly value={`${values.length} pictogram(s) selected`} />
            <button className="icon-picker-trigger btn-input btn-gray" onClick={() => setShowPopup(true)}>
              <i className="bi bi-chevron-right"></i>
            </button>
        </div>
        </div>

      {values.map((picLink: string, index: number) => (
        <div className="selected-icon" key={`selected-${index}`}>
          <img src={picLink} alt="Selected Icon" style={{ width: '50px' }} />
          <button className="delete-icon" onClick={() => handleRemove(index)}>&times;</button>
        </div>
      ))}
      {showPopup && (
        <div className="popup">
          <div className="icon-picker-header">
            <p>Select Icon</p>
            <button className="btn btn-transparent btn-white-text" onClick={() => setShowPopup(false)}>&times;</button>
          </div>
          <div className="icon-picker-body">
              <input type="text" className="form-control mb-2" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                <select className="form-control mb-2 w-50" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    {pictogramData?.categories.map((cat) => (
                      <option key={cat.id} value={cat.id.toString()}>{cat.name}</option>
                    ))}
                </select>
                <div className="pictogram-list">
                    {loading ? (
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    ) :
                    <>
                    {pictogramData?.results.map((pic) => (
                    <img key={pic.id} src={pic.link} alt={pic.name} onClick={() => handleSelect(pic)} style={{ width: '50px', cursor: 'pointer' }} />
                    ))}
                    </>
                    }
                </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IconField;
