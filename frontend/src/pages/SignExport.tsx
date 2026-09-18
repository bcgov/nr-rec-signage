import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSignService } from '../service/signService';
import { toDictionaryMap } from '../utils/SignUtils';
import { exportToSvg, renderSignMarkup } from '../utils/SvgUtils';
import SignDto from '../interfaces/SignDto';
import FieldDto from '../interfaces/FieldDto';
import { useAuth } from '@/providers/AuthProvider';


const SignExport: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getSign, saveToLibrary } = useSignService();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sign, setSign] = useState<SignDto | null>(null);
  const [fields, setFields] = useState<Map<string, FieldDto>>(new Map());
  const [metadata, setMetadata] = useState<Map<string, string>>(new Map());
  const [name, setName] = useState('exported-sign');
  const userInfo = useAuth().userInfo;

  useEffect(() => {
    const fetchSign = async () => {
      setLoading(true);
      try {
        const signDetails = await getSign(Number(id));
        setSign(signDetails);
        setFields(toDictionaryMap(signDetails.fields));
        const metadataMap = new Map<string, string>();
        signDetails.category.metadata.forEach((meta) => {
          metadataMap.set(meta.meta_key, meta.meta_value);
        });
        setMetadata(metadataMap);
      } catch (error) {
        console.error('Failed to load sign for export', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSign();
    }
  }, [id]);

  const renderSignPreview = () => {
    if (!sign) return <div>Unsupported sign type</div>;
    return renderSignMarkup(sign, fields,metadata,false);
  };

  const handleExport = () => {
    if (!sign) return;
    exportToSvg(sign, fields, metadata, name);
  };

  const handleSaveToLibrary = async () => {
    if (!sign) return;
    setSaving(true);
    try {
      await saveToLibrary(sign.id);
      setSign({ ...sign, is_saved_to_library: true });
    } catch (error) {
      console.error('Failed to save sign to library', error);
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    if(sign?.is_approved){
      navigate('/approved-signs');
      return;
    }
    navigate(`/sign-configuration/${id}`);
  }

  let saveButtonLabel = 'Save to library';
  if (sign?.is_saved_to_library) {
    saveButtonLabel = 'Saved';
  } else if (saving) {
    saveButtonLabel = 'Saving...';
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
        <div className="spinner-border" aria-label="Loading">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="centered-container d-flex flex-column align-items-center justify-content-center">
        <div className='d-flex mt-5 mb-2 justify-content-between w-100'>
            <button className="btn btn-secondary" onClick={handleBack} disabled={!sign}>
                    Edit
            </button>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary" onClick={handleSaveToLibrary} disabled={!sign || saving || sign?.is_saved_to_library}>
                {saveButtonLabel}
              </button>
              <button className="btn btn-primary" onClick={handleExport}>
                    Export
              </button>
            </div>
        </div>
        <div className="blue-heading-container mb-4">
            <div className='blue-heading'>
                <p>Final Preview</p>
            </div>
            <div className="container-content">
                <div className="mb-3">
                    <label htmlFor="sign-export-name" className="form-label fw-bold">File Name</label>
                    <input
                    id="sign-export-name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter file name"
                    />
                </div>
                <div className=" d-flex align-items-center justify-content-center mb-4">{renderSignPreview()}</div>
            </div>
        </div>
    </div>
  );
};

export default SignExport;
