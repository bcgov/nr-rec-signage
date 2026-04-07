import React, { useState, useEffect } from 'react';
import { FieldProps } from '../../interfaces/FieldProps';
import { usePictogramService } from '../../service/pictogramService';
import SignPictogramDto from '../../interfaces/SignPictogramDto';

const IconField: React.FC<FieldProps> = ({ field, updateCallback }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [pictograms, setPictograms] = useState<SignPictogramDto[]>([]);
  const [selected, setSelected] = useState<SignPictogramDto[]>([]);
  const { getPictograms } = usePictogramService();

  useEffect(() => {
    if (showPopup) {
      fetchPictograms();
    }
  }, [showPopup, search, category]);

  const fetchPictograms = async () => {
    try {
      const pics = await getPictograms(20, search, category);
      setPictograms(pics);
    } catch (err) {
      console.error('Failed to fetch pictograms');
    }
  };

  const handleSelect = (pictogram: SignPictogramDto) => {
    setSelected([...selected, pictogram]);
    updateCallback([...selected, pictogram]);
    setShowPopup(false);
  };

  const handleRemove = (index: number) => {
    const newSelected = selected.filter((_, i) => i !== index);
    setSelected(newSelected);
    updateCallback(newSelected);
  };

  return (
    <div>
      <input type="text" readOnly value={selected.map(p => p.name).join(', ')} />
      <button onClick={() => setShowPopup(true)}>+</button>
      {selected.map((pic, index) => (
        <div key={pic.id}>
          <img src={pic.link} alt={pic.name} style={{ width: '50px' }} />
          <button onClick={() => handleRemove(index)}>Delete</button>
        </div>
      ))}
      {showPopup && (
        <div className="popup">
          <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {/* Add category options */}
          </select>
          <div className="pictogram-list">
            {pictograms.map((pic) => (
              <img key={pic.id} src={pic.link} alt={pic.name} onClick={() => handleSelect(pic)} style={{ width: '50px', cursor: 'pointer' }} />
            ))}
          </div>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default IconField;
