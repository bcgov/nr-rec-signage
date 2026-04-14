import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignService } from '../service/signService';
import { useAuth } from '../providers/AuthProvider';
import RefreshPage from '../components/RefreshPage';
import SignDto from '../interfaces/SignDto';
import { renderSignMarkup } from '../utils/SvgUtils';
import FieldDto from '@/interfaces/FieldDto';
import BladeSign from '@/components/signs/BladeSign';
import CautionarySign from '@/components/signs/CautionarySign';
import RecreationSiteBoundarySign from '@/components/signs/RecreationSiteBoundarySign';
import WelcomeSign from '@/components/signs/WelcomeSign';
import InformationSign from '@/components/signs/InformationSign';
import NumberPost from '@/components/signs/NumberPost';
import RegulatorySign from '@/components/signs/RegulatorySign';

const ExistingSign: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [signs, setSigns] = useState<SignDto[]>([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { getSigns } = useSignService();
  const { userInfo } = useAuth();

    const renderSignPreview = (sign: SignDto, fields: Map<string, FieldDto>, metadata: Map<string, string>) => {
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

    return <div>Unsupported sign type</div>;
  };
  useEffect(() => {
    const fetchSigns = async () => {
      try {
        const idirUserGuid = userInfo?.idir_user_guid;
        if (!idirUserGuid) {
          setError(true);
          setLoading(false);
          return;
        }
        const fetchedSigns = await getSigns(20);
        setSigns(fetchedSigns);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    };
    fetchSigns();
  }, []);

  const handleSignClick = (sign: SignDto) => {
    navigate(`/sign-configuration/${sign.id}`);
  };

  const handleBack = () => {
    navigate('/welcome');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <RefreshPage />;
  }

  return (
    <div className="centered-l-container d-flex flex-column align-items-center justify-content-center mt-5">
      <div className="blue-heading-container mb-4">
        <div className='blue-heading'>
          <p>Your Existing Signs:</p>
        </div>
        <div className="container-content">
          <div className='c-row'>
            {signs.map((sign) => {
              const fieldsMap = new Map(sign.fields.map(f => [f.slug, f]));
              const metadataMap = new Map(sign.category.metadata?.map(m => [m.meta_key, m.meta_value]) || []);
              return (
                <div key={`existing-sign-${sign.id}`} className="sign-card" onClick={() => handleSignClick(sign)}>
                  <div style={{ width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {renderSignPreview(sign, fieldsMap, metadataMap)}
                  </div>
                  <p>Sign-{new Date(sign.dateCreated).toLocaleDateString()}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between w-100">
        <button className="btn btn-secondary" onClick={handleBack}>
          <i className="bi bi-arrow-left"></i> Back
        </button>
      </div>
    </div>
  );
};

export default ExistingSign;
