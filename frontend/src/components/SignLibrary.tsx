import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignService } from '../service/signService';
import { useAuth } from '../providers/AuthProvider';
import RefreshPage from '../components/RefreshPage';
import SignDto from '../interfaces/SignDto';
import { autoGenerateName } from '@/utils/NameUtils';
import { renderSignMarkup } from '@/utils/SvgUtils';
import ActionPopup from './ActionPopup';

interface SignLibraryProps{
    libraryStatus: string,
    searchEnabled?: boolean
}
const SignLibrary: React.FC<SignLibraryProps> = ({libraryStatus, searchEnabled = false}) => {
  const [loading, setLoading] = useState(true);
  const [signs, setSigns] = useState<SignDto[]>([]);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { getSigns, duplicate, deleteSign } = useSignService();
  const { userInfo } = useAuth();
  const [selectedSign, setSelectedSign] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const PAGE_SIZE = 20;
    const fetchSigns = async () => {
      try {
        const idirUserGuid = userInfo?.idir_user_guid;
        if (!idirUserGuid) {
          setError(true);
          setLoading(false);
          return;
        }
        const fetchedSigns = await getSigns(PAGE_SIZE, libraryStatus, currentPage, searchTerm);
        setTotalPages(Math.ceil(fetchedSigns.total / PAGE_SIZE));
        setSigns(fetchedSigns.signs);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchSigns();
  }, [currentPage]);

  useEffect(() => {
    currentPage === 1 ? fetchSigns() : setCurrentPage(1);
  }, [searchTerm]);


  const handleSignClick = async (sign: SignDto) => {
    setLoading(true);
    try{
      if(libraryStatus != 'custom'){
        navigate(`/export/${sign.id}`);
        return;
      }
      let newSign = await duplicate(sign.id);
      navigate(`/export/${newSign.id}`);
    }
    catch(err){
        setError(true);
        setLoading(false);
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

  const handleDeleteClick = (sign: SignDto) => {
    setSelectedSign(sign.id);

  }

  const handlePopupContinue = async (selectedSignId: number | null) => {
    if (selectedSignId === null) return;
    await deleteSign(selectedSignId);
  };

  const handlePopupCancel = async () => {
    setSelectedSign(null);
  };

  const handlePopupSuccess = async () => {
    setSelectedSign(null);
    currentPage === 1 ? fetchSigns() : setCurrentPage(1);
  }


  return (
    <>
    <div className="centered-l-container d-flex flex-column align-items-center justify-content-center mt-5">
      <div className="blue-heading-container mb-4">
        <div className='blue-heading'>
          <p>Existing signs you can start with:</p>
        </div>
        <div className="container-content">
            <div className="d-flex justify-content-end mb-3">
              {searchEnabled && <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-25 search-bar"
              />}
            </div>
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
                  { libraryStatus === 'custom' && <p className="action-icon"><i className="bi bi-trash" onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(sign);
                  }}></i></p>}
                  <div style={{ width: '350px', zoom: '0.4', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {renderSignMarkup(sign, fieldsMap, metadataMap,false)}
                  </div>
                  <p>{sign.name}</p>
                </div>
              );
            })}
          </div>
          {
              totalPages > 1 && (
                <div className="d-flex justify-content-center align-items-center gap-3 mt-5">
                  <button
                    className="btn btn-small btn-outline-primary"
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  >
                    Previous
                  </button>
                  <span>Page {currentPage} of {totalPages}</span>
                  <button
                    className="btn btn-small btn-outline-primary"
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  >
                    Next
                  </button>
                </div>)
          }
        </div>
      </div>
      <div className="d-flex justify-content-between w-100">
        <button className="btn btn-secondary" onClick={handleBack}>
          <i className="bi bi-arrow-left"></i> Back
        </button>
      </div>
    </div>
    <ActionPopup text="Are you sure you want to delete this sign? This action cannot be undone."
      continueAction={async () => await handlePopupContinue(selectedSign)}
      cancelAction={handlePopupCancel}
      active={selectedSign !== null}
      successAction={handlePopupSuccess}
     />
    </>
  );
};

export default SignLibrary;
