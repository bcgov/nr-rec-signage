import React from 'react';
import { useNavigate } from 'react-router-dom';

const ActionChoice: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateNew = () => {
    navigate('/new-sign');
  };

  const handleEditExisting = () => {
    navigate('/existing-signs' );
  };

  return (
    <div className="centered-container d-flex flex-column align-items-center justify-content-center">
        <div className="blue-heading-container mb-4">
            <div className='blue-heading'>
                <p>Please select from options below:</p>
            </div>
            <div className="container-content">
                <div className='c-row'>
                    <div className="action-card" onClick={handleCreateNew}>
                        <i className="bi bi-plus-lg"></i>
                        <p>Create New Signs</p>
                    </div>
                    <div className="action-card" onClick={handleEditExisting}>
                        <i className="bi bi-pencil"></i>
                        <p>Edit Existing Signs</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ActionChoice;
