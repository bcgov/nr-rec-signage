import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSignService } from '../service/signService';
import { toDictionaryMap } from '../utils/SignUtils';
import { exportToSvg } from '../utils/SvgUtils';
import SignDto from '../interfaces/SignDto';
import FieldDto from '../interfaces/FieldDto';
import BladeSign from '../components/signs/BladeSign';
import CautionarySign from '../components/signs/CautionarySign';
import RecreationSiteBoundarySign from '../components/signs/RecreationSiteBoundarySign';
import WelcomeSign from '../components/signs/WelcomeSign';
import RegulatorySign from '@/components/signs/RegulatorySign';
import InformationSign from '@/components/signs/InformationSign';
import NumberPost from '@/components/signs/NumberPost';
import FacilitySign from '@/components/signs/FacilitySign';


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
    const slug = sign.category.slug.toLowerCase();
    if(slug?.includes('camp-sign-number-post')) {
      return <NumberPost fields={fields} metadata={metadata} />;
    }

    if(slug.includes('regulatory')) {
      return <RegulatorySign fields={fields} metadata={metadata} />;
    }
    if(slug.includes('information')) {
      return <InformationSign fields={fields} metadata={metadata} />;
    }
    if (slug.includes('blade')) {
      return <BladeSign fields={fields} metadata={metadata} />;
    }
    if (slug.includes('cautionary')) {
      return <CautionarySign fields={fields} metadata={metadata} />;
    }
    if (slug.includes('boundary')) {
      return <RecreationSiteBoundarySign fields={fields} metadata={metadata} />;
    }
    if (slug.includes('welcome')) {
      return <WelcomeSign fields={fields} metadata={metadata} />;
    }
    if(slug.includes('facility'))
    {
      return <FacilitySign fields={fields} metadata={metadata} />;
    }

    return <div>Unsupported sign type</div>;
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
            <button className="btn btn-secondary" onClick={()=> navigate(`/sign-configuration/${id}`)} disabled={!sign}>
                    Back
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
