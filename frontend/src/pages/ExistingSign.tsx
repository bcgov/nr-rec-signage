import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignService } from '../service/signService';
import { useAuth } from '../providers/AuthProvider';
import RefreshPage from '../components/RefreshPage';
import SignDto from '../interfaces/SignDto';
import { renderSignPreview } from '../utils/SignPreview';
import { autoGenerateName } from '@/utils/NameUtils';
import { sign } from 'crypto';

const ExistingSign: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [signs, setSigns] = useState<SignDto[]>([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { getSigns, duplicate } = useSignService();
  const { userInfo } = useAuth();

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
        setSigns(fetchedSigns.signs);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    };
    fetchSigns();
  }, []);

  const handleSignClick = async (sign: SignDto) => {
    setLoading(true);
    try{
      const newSign: SignDto = await duplicate(sign.id);
      navigate(`/sign-configuration/${newSign.id}`);
    }
    catch(err){

    }
  };

  const handleBack = () => {
    navigate('/');
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
          <p>Existing signs you can start with:</p>
        </div>
        <div className="container-content">
          <div className='c-row'>
            {signs.length == 0 &&<div className="mt-5 mb-5 d-flex align-items-center justify-content-center">
               <p>No existing sign to start off with for now. Create a sign and save it to the library to make it available on this tab.</p>
            </div>}
            {signs.map((sign) => {
              const fieldsMap = new Map(sign.fields.map(f => [f.slug, f]));
              const metadataMap = new Map(sign.category.metadata?.map(m => [m.meta_key, m.meta_value]) || []);
              return (
                <div
                  key={`existing-sign-${sign.id}`}
                  className="sign-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSignClick(sign)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleSignClick(sign);
                    }
                  }}
                >
                  <div style={{ width: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {renderSignPreview(sign, fieldsMap, metadataMap)}
                  </div>
                  <p>{autoGenerateName(sign)}</p>
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
